if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
    let meta = document.createElement('meta')
    meta.name = 'viewport'
    meta.content = 'width=device-width, height=device-height, initial-scale=1.0, user-scalable=no, shrink-to-fit=yes'
    document.getElementsByTagName('head')[0].appendChild(meta)
}

const CANVAS = document.getElementById('canvas')

// Veggie Cats: the portals allow no requests but the Bridge's (Playgama checklist 11, 14). The
// engine keeps calling Unity Connect (config.uca / cdp.cloud.unity3d.com) even with Analytics and
// Unity Connect switched off in the build — so the page refuses every *.unity3d.com request. To the
// engine it looks like being offline, which it already handles. The host is compared, not the text:
// the engine asks for "https://config.uca.cloud.unity3d.com" with no trailing slash.
const vcFetch = window.fetch.bind(window)
function vcIsUnityHost(url) {
    try {
        const host = new URL(url, location.href).hostname.toLowerCase()
        return host === 'unity3d.com' || host.endsWith('.unity3d.com')
    } catch {
        return false
    }
}
window.fetch = function (input, init) {
    const url = typeof input === 'string' ? input : input?.url ?? String(input)
    if (vcIsUnityHost(url))
        return Promise.reject(new TypeError('blocked on the web portals: ' + url))
    return vcFetch(input, init)
}
const STORAGE_DATA_SEPARATOR = '{bridge_data_separator}'
const STORAGE_KEYS_SEPARATOR = '{bridge_keys_separator}'
const STORAGE_VALUES_SEPARATOR = '{bridge_values_separator}'

// utils
window.unityInstance = null
const messageQueue = []
let progressBarFillingInterval = null
let progressBarCompleteFillingStarted = false

function sendMessageToUnity(name, value) {
    if (window.unityInstance !== null) {
        window.unityInstance.SendMessage('PlaygamaBridge', name, value)
    } else {
        messageQueue.push({ name, value })
    }
}

function flushMessageQueue() {
    while (messageQueue.length > 0) {
        const message = messageQueue.shift()
        if (window.unityInstance !== null) {
            window.unityInstance.SendMessage('PlaygamaBridge', message.name, message.value)
        }
    }
}

function onUnityLoadingProgressChanged(progress) {
    if (progress >= 1) {
        if (progressBarFillingInterval !== null) {
            clearInterval(progressBarFillingInterval)
            progressBarFillingInterval = null
        }
        bridge.setGameLoadingProgress(100)
        return
    }

    if (progressBarCompleteFillingStarted) {
        return
    }

    if (progress >= 0.9) {
        progressBarCompleteFillingStarted = true
        completeProgressBarFilling()
        return
    }

    bridge.setGameLoadingProgress(progress * 100)
}

function completeProgressBarFilling() {
    if (progressBarFillingInterval !== null) {
        return
    }

    let currentPercent = 90
    bridge.setGameLoadingProgress(currentPercent)
    progressBarFillingInterval = setInterval(() => {
        currentPercent++
        if (currentPercent > 99) {
            currentPercent = 99
        }

        bridge.setGameLoadingProgress(currentPercent)

        if (currentPercent >= 99) {
            clearInterval(progressBarFillingInterval)
            progressBarFillingInterval = null
            return
        }
    }, 500)
}

window.addEventListener('pointerdown', () => {
    window.focus()
    CANVAS.focus()
})

let bridgeScript = null
let bridgeTimeout = null
let bridgeLoaded = false

function addLocalBridge() {
    if (bridgeLoaded) return
    bridgeLoaded = true
    clearTimeout(bridgeTimeout)

    if (bridgeScript && bridgeScript.parentNode) {
        bridgeScript.onload = null
        bridgeScript.onerror = null
        bridgeScript.parentNode.removeChild(bridgeScript)
    }

    window.bridge = null
    window.playgamaBridge = null

    const scriptElement = document.createElement('script')
    scriptElement.src = './playgama-bridge.js'
    scriptElement.onload = function() {
        initializeBridge()
    }
    document.body.appendChild(scriptElement)
}

bridgeScript = document.createElement('script')
bridgeScript.src = 'https://bridge.playgama.com/v2/stable/playgama-bridge.js'
bridgeScript.onload = initializeBridge
bridgeScript.onerror = addLocalBridge

bridgeTimeout = setTimeout(() => {
    console.warn('CDN bridge failed to load within 2 seconds, loading local bridge')
    addLocalBridge()
}, 2000)

document.head.appendChild(bridgeScript)

function initializeBridge() {
    clearTimeout(bridgeTimeout)
    bridge.engine = 'unity'
    bridge.gameVersion = '0.1.001'
    bridge
        .initialize()
        .then(() => {
            bridge.setGameLoadingProgress(0)
            bridge.advertisement.on('banner_state_changed', state => sendMessageToUnity('OnBannerStateChanged', state))
            bridge.advertisement.on('interstitial_state_changed', state => sendMessageToUnity('OnInterstitialStateChanged', state))
            bridge.advertisement.on('rewarded_state_changed', state => sendMessageToUnity('OnRewardedStateChanged', state))
            bridge.advertisement.on('advanced_banners_state_changed', state => sendMessageToUnity('OnAdvancedBannersStateChanged', state))
            bridge.platform.on('audio_state_changed', isEnabled => sendMessageToUnity('OnAudioStateChanged', isEnabled.toString()))
            bridge.platform.on('pause_state_changed', isPaused => sendMessageToUnity('OnPauseStateChanged', isPaused.toString()))

            let unityLoader = document.createElement('script')
            unityLoader.src = 'Build/Web.loader.js'
            unityLoader.onload = () => {
                createUnityInstance(
                    CANVAS,
                    {
                        dataUrl: 'Build/Web.data.unityweb',
                        frameworkUrl: 'Build/Web.framework.js.unityweb',
                        codeUrl: 'Build/Web.wasm.unityweb',
                        streamingAssetsUrl: 'StreamingAssets',
                        companyName: 'Booblyc',
                        productName: 'Veggie Cats',
                        productVersion: '0.1.001',
                        // matchWebGLToCanvasSize: false, // Uncomment this to separately control WebGL canvas render size and DOM element size.
                        // Veggie Cats: see vcPixelRatio below. (Local change to the package file.)
                        devicePixelRatio: vcPixelRatio(),
                    },
                    onUnityLoadingProgressChanged)
                    .then((unityInstance) => {
                        window.unityInstance = unityInstance
                        // The engine re-reads Module.devicePixelRatio on every canvas resize, so a
                        // getter keeps the budget when the window grows (full screen, rotation).
                        Object.defineProperty(unityInstance.Module, 'devicePixelRatio', { get: vcPixelRatio, configurable: true })
                        // The first seconds (shader warm-up, scene load) are slow on any machine.
                        setTimeout(vcStartAdaptiveResolution, 10000)
                        CANVAS.focus()
                        flushMessageQueue()
                    })
                    .catch((error) => {
                        console.error(error)
                    })
            }
            document.body.appendChild(unityLoader)
        })
        .catch(error => console.error(error))
}

// Veggie Cats: the game is GPU fill-bound — frame time grows with the canvas pixel count (a full
// 1920x1080 window at DPR 2 did not render a frame). The canvas backing store is kept within a
// pixel budget and DPR 2; a small window keeps full sharpness, a big one is rendered a bit softer.
// QA: ?px=<pixels> overrides the budget (?px=Infinity — no budget).
const VC_QUERY = new URLSearchParams(location.search)
const VC_PIXEL_BUDGET = Number(VC_QUERY.get('px')) || 1920 * 1080
// Share of those pixels actually rendered: 1 — high graphics, 0.5 — low, less after adaptive steps.
// A share, not a lower budget: a small window is already under any budget, and "low" must still
// make a difference there.
let vcScale = 1
function vcPixelRatio() {
    const rect = CANVAS.getBoundingClientRect()
    const cssPixels = Math.max(1, rect.width * rect.height)
    return Math.min(window.devicePixelRatio || 1, 2, Math.sqrt(VC_PIXEL_BUDGET / cssPixels)) * Math.sqrt(vcScale)
}

// Graphics setting (the game's web settings, WebGraphics.cs): 0 auto — the player has not picked
// anything, starts high and may drop to low; 1 high — the player's choice, never lowered here;
// 2 low — half the pixels (the game is GPU fill-bound, so about twice the headroom).
const VC_LOW_SCALE = 0.5
let vcGraphics = 0
window.vcSetGraphics = function (mode) {
    vcGraphics = mode
    if (mode === 1)
        vcScale = 1
    else if (mode === 2)
        vcScale = Math.min(vcScale, VC_LOW_SCALE)
    console.log(`[Veggie] graphics ${['auto', 'high', 'low'][mode]} — ${Math.round(vcScale * 100)}% of the pixels`)
}

// Adaptive resolution for weak GPUs (office laptops, old phones). The engine polls
// Module.devicePixelRatio every frame, so lowering the budget resizes the canvas at once. If the
// median frame stays slower than ~45 fps for three 2-second windows in a row, the graphics drop to
// low (the game is told, and its settings show it — the player can switch back to high), and if
// that is still slow, by a quarter at a time down to 35% of the start. It never goes back up by
// itself: at the 60 fps cap there is no telling how much headroom there is, and flip-flopping is
// worse than a slightly softer picture. A player who picked "high" is left alone. A fast machine
// never gets here — its picture does not change. QA: ?adapt=<ms> sets the slow-frame threshold
// (?adapt=0 turns it off).
function vcStartAdaptiveResolution() {
    const slowFrameMs = Number(VC_QUERY.get('adapt') ?? 22)
    if (!slowFrameMs)
        return
    const minScale = 0.35
    let intervals = [], last = performance.now(), windowStart = last, slowWindows = 0
    const tick = (now) => {
        const interval = now - last
        last = now
        if (interval < 250 && !document.hidden)  // a hidden tab or a stall is not the GPU
            intervals.push(interval)
        if (now - windowStart >= 2000) {
            intervals.sort((a, b) => a - b)
            const median = intervals.length > 20 ? intervals[intervals.length >> 1] : 0
            slowWindows = median > slowFrameMs && vcGraphics !== 1 ? slowWindows + 1 : 0
            if (slowWindows >= 3 && vcGraphics === 0) {
                vcGraphics = 2
                vcScale = Math.min(vcScale, VC_LOW_SCALE)
                slowWindows = 0
                console.log(`[Veggie] frame ${median.toFixed(1)} ms — graphics low, ${Math.round(vcScale * 100)}% of the pixels`)
                window.unityInstance?.SendMessage('WebGraphics', 'OnAutoLow', '')
            } else if (slowWindows >= 3 && vcScale > minScale) {
                vcScale = Math.max(minScale, vcScale * 0.75)
                slowWindows = 0
                console.log(`[Veggie] frame ${median.toFixed(1)} ms — ${Math.round(vcScale * 100)}% of the pixels`)
            }
            intervals = []
            windowStart = now
        }
        requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
}

// platform
window.getPlatformId = function() {
    return bridge.platform.id
}

window.getPlatformLanguage = function() {
    return bridge.platform.language
}

window.getPlatformPayload = function() {
    let payload = bridge.platform.payload
    if (typeof payload === 'string') {
        return payload
    } else {
        return ''
    }
}

window.getPlatformTld = function() {
    let tld = bridge.platform.tld
    if (typeof tld === 'string') {
        return tld
    } else {
        return ''
    }
}

window.getPlatformLaunchSource = function() {
    let launchSource = bridge.platform.launchSource
    if (typeof launchSource === 'string') {
        return launchSource
    } else {
        return ''
    }
}

window.getPlatformData = function() {
    if (bridge.platform.data) {
        return JSON.stringify(bridge.platform.data)
    }

    return ''
}

window.getIsPlatformAudioEnabled = function() {
    return bridge.platform.isAudioEnabled.toString()
}

window.getIsPlatformExternalCallsSupported = function() {
    return bridge.platform.isExternalCallsSupported.toString()
}

window.getIsPlatformExternalLinksAllowed = function() {
    return bridge.platform.isExternalLinksAllowed.toString()
}

window.sendMessageToPlatform = function(message, options) {
    if (options) {
        options = JSON.parse(options)
    }

    bridge.platform.sendMessage(message, options)
}

window.sendCustomMessageToPlatform = function(id, options) {
    if (options) {
        options = JSON.parse(options)
    }

    bridge.platform.sendCustomMessage(id, options)
}

window.getServerTime = function() {
    bridge.platform.getServerTime()
        .then(result => {
            sendMessageToUnity('OnGetServerTimeCompleted', result.toString())
        })
        .catch(error => {
            sendMessageToUnity('OnGetServerTimeCompleted', 'false')
        })
}

// cross promo
window.crossPromoGetGamesList = function() {
    bridge.crossPromo.getGames()
        .then(result => {
            sendMessageToUnity('OnCrossPromoGetGamesListCompletedSuccess', JSON.stringify(result))
        })
        .catch(error => {
            sendMessageToUnity('OnCrossPromoGetGamesListCompletedFailed')
        })
}

window.crossPromoShow = function() {
    bridge.crossPromo.show()
}

window.crossPromoHide = function() {
    bridge.crossPromo.hide()
}

window.getIsCrossPromoVisible = function() {
    return bridge.crossPromo.isVisible.toString()
}

// device
window.getDeviceType = function() {
    return bridge.device.type
}

window.getSafeArea = function() {
    return JSON.stringify(bridge.device.safeArea)
}


// player
window.getIsPlayerAuthorizationSupported = function() {
    return bridge.player.isAuthorizationSupported.toString()
}

window.getIsPlayerAuthorized = function() {
    return bridge.player.isAuthorized.toString()
}

window.getIsPlayerGuest = function() {
    return bridge.player.isGuest.toString()
}

window.getPlayerId = function() {
    if (bridge.player.id) {
        return bridge.player.id.toString()
    }

    return ''
}

window.getPlayerName = function() {
    if (bridge.player.name) {
        return bridge.player.name.toString()
    }

    return ''
}

window.getPlayerPhotos = function() {
    if (bridge.player.photos.length > 0) {
        return JSON.stringify(bridge.player.photos)
    }

    return ''
}

window.getPlayerExtra = function() {
    if (bridge.player.extra) {
        return JSON.stringify(bridge.player.extra)
    }

    return ''
}

window.authorizePlayer = function(options) {
    if (options) {
        options = JSON.parse(options)
    }

    bridge.player.authorize(options)
        .then(() => {
            sendMessageToUnity('OnAuthorizeCompleted', 'true')
        })
        .catch(error => {
            sendMessageToUnity('OnAuthorizeCompleted', 'false')
        })
}


// storage
window.getStorageData = function(key) {
    let keys = key.split(STORAGE_KEYS_SEPARATOR)

    bridge.storage.get(keys, false)
        .then(data => {
            if (keys.length > 1) {
                let values = []

                for (let i = 0; i < keys.length; i++) {
                    let value = data[i]
                    if (value) {
                        if (typeof value !== 'string') {
                            value = JSON.stringify(value)
                        }

                        values.push(value)
                    } else {
                        values.push('')
                    }
                }

                sendMessageToUnity('OnGetStorageDataSuccess', `${key}${STORAGE_DATA_SEPARATOR}${values.join(STORAGE_VALUES_SEPARATOR)}`)
            } else {
                if (data[0]) {
                    if (typeof data[0] !== 'string') {
                        data = JSON.stringify(data[0])
                    }
                } else {
                    data = ''
                }

                sendMessageToUnity('OnGetStorageDataSuccess', `${key}${STORAGE_DATA_SEPARATOR}${data}`)
            }
        })
        .catch(error => {
            sendMessageToUnity('OnGetStorageDataFailed', key)
        })
}

window.setStorageData = function(key, value) {
    let keys = key.split(STORAGE_KEYS_SEPARATOR)
    let values = value.split(STORAGE_VALUES_SEPARATOR)

    bridge.storage.set(keys, values)
        .then(() => {
            sendMessageToUnity('OnSetStorageDataSuccess', key)
        })
        .catch(error => {
            sendMessageToUnity('OnSetStorageDataFailed', key)
        })
}

window.deleteStorageData = function(key) {
    let keys = key.split(STORAGE_KEYS_SEPARATOR)

    bridge.storage.delete(keys)
        .then(() => {
            sendMessageToUnity('OnDeleteStorageDataSuccess', key)
        })
        .catch(error => {
            sendMessageToUnity('OnDeleteStorageDataFailed', key)
        })
}


// advertisement
window.getInterstitialState = function() {
    if (bridge.advertisement.interstitialState) {
        return bridge.advertisement.interstitialState
    } else {
        return ''
    }
}

window.getIsBannerSupported = function() {
    return bridge.advertisement.isBannerSupported.toString()
}

window.getIsInterstitialSupported = function() {
    return bridge.advertisement.isInterstitialSupported.toString()
}

window.getMinimumDelayBetweenInterstitial = function() {
    return bridge.advertisement.minimumDelayBetweenInterstitial.toString()
}

window.setMinimumDelayBetweenInterstitial = function(options) {
    bridge.advertisement.setMinimumDelayBetweenInterstitial(options)
}

window.getIsRewardedSupported = function() {
    return bridge.advertisement.isRewardedSupported.toString()
}

window.getRewardedPlacement = function() {
    if (bridge.advertisement.rewardedPlacement) {
        return bridge.advertisement.rewardedPlacement
    } else {
        return ''
    }
}

window.showBanner = function(position, placement) {
    bridge.advertisement.showBanner(position, placement)
}

window.hideBanner = function() {
    bridge.advertisement.hideBanner()
}

window.showInterstitial = function(placement) {
    bridge.advertisement.showInterstitial(placement)
}

window.showRewarded = function(placement) {
    bridge.advertisement.showRewarded(placement)
}

window.getIsAdvancedBannersSupported = function() {
    return bridge.advertisement.isAdvancedBannersSupported.toString()
}

window.getAdvancedBannersState = function() {
    if (bridge.advertisement.advancedBannersState) {
        return bridge.advertisement.advancedBannersState
    } else {
        return ''
    }
}

window.showAdvancedBanners = function(placement) {
    bridge.advertisement.showAdvancedBanners(placement)
}

window.hideAdvancedBanners = function() {
    bridge.advertisement.hideAdvancedBanners()
}

window.checkAdBlock = function() {
    bridge.advertisement.checkAdBlock()
        .then(result => {
            sendMessageToUnity('OnCheckAdBlockCompleted', result.toString())
        })
        .catch(error => {
            sendMessageToUnity('OnCheckAdBlockCompleted', 'false')
        })
}


// social
window.getIsShareSupported = function() {
    return bridge.social.isShareSupported.toString()
}

window.getIsInviteFriendsSupported = function() {
    return bridge.social.isInviteFriendsSupported.toString()
}

window.getIsJoinCommunitySupported = function() {
    return bridge.social.isJoinCommunitySupported.toString()
}

window.getIsCreatePostSupported = function() {
    return bridge.social.isCreatePostSupported.toString()
}

window.getIsAddToHomeScreenSupported = function() {
    return bridge.social.isAddToHomeScreenSupported.toString()
}

window.getIsAddToHomeScreenRewardSupported = function() {
    return bridge.social.isAddToHomeScreenRewardSupported.toString()
}

window.getIsAddToFavoritesSupported = function() {
    return bridge.social.isAddToFavoritesSupported.toString()
}

window.getIsAddToFavoritesRewardSupported = function() {
    return bridge.social.isAddToFavoritesRewardSupported.toString()
}

window.getIsRateSupported = function() {
    return bridge.social.isRateSupported.toString()
}

window.getIsPostRewardSupported = function() {
    return bridge.social.isPostRewardSupported.toString()
}

window.share = function(options) {
    if (options) {
        options = JSON.parse(options)
    }

    bridge.social.share(options)
        .then(() => {
            sendMessageToUnity('OnShareCompleted', 'true')
        })
        .catch(error => {
            sendMessageToUnity('OnShareCompleted', 'false')
        })
}

window.inviteFriends = function(options) {
    if (options) {
        options = JSON.parse(options)
    }

    bridge.social.inviteFriends(options)
        .then(() => {
            sendMessageToUnity('OnInviteFriendsCompleted', 'true')
        })
        .catch(error => {
            sendMessageToUnity('OnInviteFriendsCompleted', 'false')
        })
}

window.joinCommunity = function(options) {
    if (options) {
        options = JSON.parse(options)
    }

    bridge.social.joinCommunity(options)
        .then(() => {
            sendMessageToUnity('OnJoinCommunityCompleted', 'true')
        })
        .catch(error => {
            sendMessageToUnity('OnJoinCommunityCompleted', 'false')
        })
}

window.createPost = function(options, payload) {
    if (options) {
        options = JSON.parse(options)
    }

    bridge.social.createPost(options, payload || undefined)
        .then(() => {
            sendMessageToUnity('OnCreatePostCompleted', 'true')
        })
        .catch(error => {
            sendMessageToUnity('OnCreatePostCompleted', 'false')
        })
}

window.addToHomeScreen = function() {
    bridge.social.addToHomeScreen()
        .then(() => {
            sendMessageToUnity('OnAddToHomeScreenCompleted', 'true')
        })
        .catch(error => {
            sendMessageToUnity('OnAddToHomeScreenCompleted', 'false')
        })
}

window.addToFavorites = function() {
    bridge.social.addToFavorites()
        .then(() => {
            sendMessageToUnity('OnAddToFavoritesCompleted', 'true')
        })
        .catch(error => {
            sendMessageToUnity('OnAddToFavoritesCompleted', 'false')
        })
}

window.rate = function() {
    bridge.social.rate()
        .then(() => {
            sendMessageToUnity('OnRateCompleted', 'true')
        })
        .catch(error => {
            sendMessageToUnity('OnRateCompleted', 'false')
        })
}

window.getAddToHomeScreenReward = function() {
    bridge.social.getAddToHomeScreenReward()
        .then(() => {
            sendMessageToUnity('OnGetAddToHomeScreenRewardCompleted', 'true')
        })
        .catch(error => {
            sendMessageToUnity('OnGetAddToHomeScreenRewardCompleted', 'false')
        })
}

window.getAddToFavoritesReward = function() {
    bridge.social.getAddToFavoritesReward()
        .then(() => {
            sendMessageToUnity('OnGetAddToFavoritesRewardCompleted', 'true')
        })
        .catch(error => {
            sendMessageToUnity('OnGetAddToFavoritesRewardCompleted', 'false')
        })
}

window.getPostReward = function() {
    bridge.social.getPostReward()
        .then(data => {
            sendMessageToUnity('OnGetPostRewardCompletedSuccess', data ? JSON.stringify(data) : '[]')
        })
        .catch(error => {
            sendMessageToUnity('OnGetPostRewardCompletedFailed', 'false')
        })
}


// leaderboards
window.getLeaderboardsType = function() {
    return bridge.leaderboards.type
}

window.leaderboardsSetScore = function(id, score) {
    score = parseInt(score)
    bridge.leaderboards.setScore(id, score)
        .then(() => {
            sendMessageToUnity('OnLeaderboardsSetScoreCompleted', 'true')
        })
        .catch(error => {
            sendMessageToUnity('OnLeaderboardsSetScoreCompleted', 'false')
        })
}

window.leaderboardsGetEntries = function(id) {
    bridge.leaderboards.getEntries(id)
        .then(data => {
            if (data) {
                sendMessageToUnity('OnLeaderboardsGetEntriesCompletedSuccess', JSON.stringify(data))
            } else {
                sendMessageToUnity('OnLeaderboardsGetEntriesCompletedSuccess', '')
            }
        })
        .catch(error => {
            sendMessageToUnity('OnLeaderboardsGetEntriesCompletedFailed', 'false')
        })
}

window.leaderboardsShowNativePopup = function(id) {
    bridge.leaderboards.showNativePopup(id)
        .then(() => {
            sendMessageToUnity('OnLeaderboardsShowNativePopupCompleted', 'true')
        })
        .catch(error => {
            sendMessageToUnity('OnLeaderboardsShowNativePopupCompleted', 'false')
        })
}

window.getIsPaymentsSupported = function() {
    return bridge.payments.isSupported.toString()
}

window.paymentsPurchase = function(id, options) {
    if (options) {
        options = JSON.parse(options)
    }

    bridge.payments.purchase(id, options)
        .then(data => {
            if (data) {
                if (typeof data !== 'string') {
                    data = JSON.stringify(data)
                }

                sendMessageToUnity('OnPaymentsPurchaseCompleted', data)
            } else {
                sendMessageToUnity('OnPaymentsPurchaseCompleted', '')
            }
        })
        .catch(error => {
            sendMessageToUnity('OnPaymentsPurchaseFailed', '')
        })
}

window.paymentsConsumePurchase = function(id) {
    bridge.payments.consumePurchase(id)
        .then(data => {
            if (data) {
                if (typeof data !== 'string') {
                    data = JSON.stringify(data)
                }

                sendMessageToUnity('OnPaymentsConsumePurchaseCompleted', data)
            } else {
                sendMessageToUnity('OnPaymentsConsumePurchaseCompleted', '')
            }
        })
        .catch(error => {
            sendMessageToUnity('OnPaymentsConsumePurchaseFailed', '')
        })
}

window.paymentsGetCatalog = function() {
    bridge.payments.getCatalog()
        .then(data => {
            if (data) {
                if (typeof data !== 'string') {
                    data = JSON.stringify(data)
                }

                sendMessageToUnity('OnPaymentsGetCatalogCompletedSuccess', data)
            } else {
                sendMessageToUnity('OnPaymentsGetCatalogCompletedSuccess', '')
            }
        })
        .catch(error => {
            sendMessageToUnity('OnPaymentsGetCatalogCompletedFailed', '')
        })
}

window.paymentsGetPurchases = function() {
    bridge.payments.getPurchases()
        .then(data => {
            if (data) {
                if (typeof data !== 'string') {
                    data = JSON.stringify(data)
                }

                sendMessageToUnity('OnPaymentsGetPurchasesCompletedSuccess', data)
            } else {
                sendMessageToUnity('OnPaymentsGetPurchasesCompletedSuccess', '')
            }
        })
        .catch(error => {
            sendMessageToUnity('OnPaymentsGetPurchasesCompletedFailed', '')
        })
}

window.getIsRemoteConfigSupported = function() {
    return bridge.remoteConfig.isSupported.toString()
}

window.remoteConfigSetContext = function(parameters) {
    if (parameters) {
        parameters = JSON.parse(parameters)
    }

    bridge.remoteConfig.setContext(parameters)
}

window.remoteConfigGet = function() {
    bridge.remoteConfig.get()
        .then(data => {
            if (typeof data !== 'string') {
                data = JSON.stringify(data)
            }

            sendMessageToUnity('OnRemoteConfigGetSuccess', data)
        })
        .catch(error => {
            sendMessageToUnity('OnRemoteConfigGetFailed', '')
        })
}

window.achievementsUnlock = function(id) {
    bridge.achievements.unlock(id)
        .then(() => {
            sendMessageToUnity('OnAchievementsUnlockCompleted', 'true')
        })
        .catch(error => {
            sendMessageToUnity('OnAchievementsUnlockCompleted', 'false')
        })
}

window.achievementsGetAchievements = function() {
    bridge.achievements.getAchievements()
        .then(data => {
            if (data) {
                sendMessageToUnity('OnAchievementsGetAchievementsCompletedSuccess', JSON.stringify(data))
            } else {
                sendMessageToUnity('OnAchievementsGetAchievementsCompletedSuccess', '')
            }
        })
        .catch(error => {
            sendMessageToUnity('OnAchievementsGetAchievementsCompletedFailed', 'false')
        })
}

// tasks
window.tasksGetTasks = function() {
    bridge.tasks.getTasks()
        .then(data => {
            sendMessageToUnity('OnTasksGetTasksCompletedSuccess', data ? JSON.stringify(data) : '[]')
        })
        .catch(error => {
            sendMessageToUnity('OnTasksGetTasksCompletedFailed', 'false')
        })
}

window.tasksAddProgress = function(options) {
    options = JSON.parse(options)

    bridge.tasks.addProgress(options.metric, options.amount)
        .then(() => {
            sendMessageToUnity('OnTasksAddProgressCompletedSuccess', '')
        })
        .catch(error => {
            sendMessageToUnity('OnTasksAddProgressCompletedFailed', 'false')
        })
}

window.tasksClaimReward = function(options) {
    options = JSON.parse(options)

    bridge.tasks.claimReward(options.id)
        .then(claimed => {
            sendMessageToUnity('OnTasksClaimRewardCompletedSuccess', claimed ? 'true' : 'false')
        })
        .catch(error => {
            sendMessageToUnity('OnTasksClaimRewardCompletedFailed', 'false')
        })
}

// daily rewards
window.dailyRewardsGetRewards = function() {
    bridge.dailyRewards.getRewards()
        .then(data => {
            sendMessageToUnity('OnDailyRewardsGetRewardsCompletedSuccess', data ? JSON.stringify(data) : '[]')
        })
        .catch(error => {
            sendMessageToUnity('OnDailyRewardsGetRewardsCompletedFailed', 'false')
        })
}

window.dailyRewardsGetCurrentDay = function() {
    bridge.dailyRewards.getCurrentDay()
        .then(day => {
            sendMessageToUnity('OnDailyRewardsGetCurrentDayCompletedSuccess', day.toString())
        })
        .catch(error => {
            sendMessageToUnity('OnDailyRewardsGetCurrentDayCompletedFailed', 'false')
        })
}

window.dailyRewardsGetCurrentReward = function() {
    bridge.dailyRewards.getCurrentReward()
        .then(reward => {
            sendMessageToUnity('OnDailyRewardsGetCurrentRewardCompletedSuccess', reward ? reward.toString() : '')
        })
        .catch(error => {
            sendMessageToUnity('OnDailyRewardsGetCurrentRewardCompletedFailed', 'false')
        })
}

window.dailyRewardsClaimCurrentReward = function() {
    bridge.dailyRewards.claimCurrentReward()
        .then(claimed => {
            sendMessageToUnity('OnDailyRewardsClaimCurrentRewardCompletedSuccess', claimed ? 'true' : 'false')
        })
        .catch(error => {
            sendMessageToUnity('OnDailyRewardsClaimCurrentRewardCompletedFailed', 'false')
        })
}

// notifications
window.getIsNotificationsSupported = function() {
    return bridge.notifications.isSupported.toString()
}

window.notificationsSchedule = function(options) {
    options = JSON.parse(options)

    bridge.notifications.schedule(options)
        .then(() => {
            sendMessageToUnity('OnNotificationsScheduleCompletedSuccess', '')
        })
        .catch(error => {
            sendMessageToUnity('OnNotificationsScheduleCompletedFailed', 'false')
        })
}

window.notificationsCancel = function(id) {
    bridge.notifications.cancel(id)
        .then(() => {
            sendMessageToUnity('OnNotificationsCancelCompletedSuccess', '')
        })
        .catch(error => {
            sendMessageToUnity('OnNotificationsCancelCompletedFailed', 'false')
        })
}

window.notificationsCancelAll = function() {
    bridge.notifications.cancelAll()
        .then(() => {
            sendMessageToUnity('OnNotificationsCancelAllCompletedSuccess', '')
        })
        .catch(error => {
            sendMessageToUnity('OnNotificationsCancelAllCompletedFailed', 'false')
        })
}
