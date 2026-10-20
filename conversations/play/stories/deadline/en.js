"use strict";
/* ---------- 2. Deadline ---------- */
Amedi.stories.register("en","deadline", {
  em:"📵", title:"Deadline", who:"Max", diff:"tougher",
  desc:"You blew the Friday build. The client calls Sunday evening: an investor tomorrow. Max is no advocate of nonviolent communication: he shouts, pushes, and gets personal.",
  storageKey:"deadline_endings",
  start:{wall:55,contact:5},
  intro:`Sunday, nine in the evening. You promised Max a stable prototype build by Friday — but the AI agent in the game started walking in circles, and you spent two days chasing that bug. You never worked up the nerve to write about the delay: you figured you'd catch up. You didn't. The phone buzzes: Max. He's got an investor meeting tomorrow.`,
  nodes:{
    n1:{
      npc:()=>`You said Friday. It's Sunday now and I have no build. Tomorrow at ten I'm showing the game to an investor. Do you even understand that you screwed me over?`,
      options:[
        { icon:"🛡", tag:"Excuse", cls:"bad", dw:+14, dc:0,
          text:`Max, there's a bug in the agent, it's not obvious, it's not my fault — that's just how development goes sometimes.`,
          react:()=>`"Sometimes"?! I have an investor tomorrow, and you give me "sometimes"! Should I show him your bugs?`,
          coach:`The fact is true, but right now it sounds like "your problem isn't a real problem." His panic goes unheard.` },
        { icon:"🔥", tag:"Counterattack", cls:"bad", dw:+20, dc:0, aggro:1,
          text:`Maybe let's remember who changed the spec three times in the last month? I'm not a magician.`,
          react:()=>`Oh, of course, it's me again! Brilliant! Maybe I should write the code for you too?`,
          coach:`Even a fair jab is an escalation right now. Now you're both defending yourselves, and nobody's saving tomorrow's meeting.` },
        { icon:"🎯", tag:"Own the fact", cls:"good", dw:-15, dc:+12,
          text:`Yes. I promised Friday and didn't deliver. And I didn't warn you — that's the worst part. You're angry, and you have a meeting tomorrow. Let me tell you where we actually stand.`,
          react:s=> s.wall>=60 ? `...Fine. Go ahead. Just no fairy tales.` : `...Okay. Go ahead. Where are we?`,
          coach:`Owning the fact without self-flagellation is the fastest way to stop the attack: there's nothing left to argue with.` },
        { icon:"🙇", tag:"Grovel", cls:"meh", dw:+3, dc:+3, fake:1,
          text:`I'm sorry, I'm sorry, I'm sorry. I'll stay up all night and redo everything by morning, I promise!`,
          react:()=>`All night? And at nine AM you'll bring me raw, sleep-deprived code for an investor meeting? Great plan.`,
          coach:`Panic in response to panic. The promise is unrealistic — and he hears that. It doesn't build trust.` },
      ],
      next:"n2"
    },
    n2:{
      enter:{dw:+8, note:"Max is no NVC practitioner: he's still boiling, and the wall grows on its own"},
      npc:s=> s.wall<55
        ? `"Where we stand"... We're screwed — that's where we stand! I borrowed money for this project, you know that? Maybe I'm just paying the wrong person, huh?`
        : `You know what, I don't care where we stand anymore. I care why I'm paying someone who blows deadlines and stays silent.`,
      options:[
        { icon:"🚧", tag:"Boundary", cls:"good", dw:-15, dc:+15,
          text:`Stop. I want to fix this tonight, and I'm not going anywhere. But let's stick to facts: about the build and the meeting — yes. About "the wrong person" — no. We won't solve anything this way.`,
          react:s=> s.wall>=60 ? `...Fine. Fine! Stick to facts. What are you proposing?` : `...Okay. Sorry. Just tell me what to do about tomorrow.`,
          coach:`A boundary isn't an attack or an insult. You didn't forbid him from being angry — you named what you'll discuss and what you won't.` },
        { icon:"🌫", tag:"Swallow it", cls:"meh", dw:+5, dc:0, fake:1,
          text:`...Yeah, I get it. Tell me what to do, and I'll do it.`,
          react:()=>`Do what?! Build me a time machine! Ugh... So what do we do about tomorrow, genius?`,
          coach:`You swallowed "the wrong person" — and he'll remember that as acceptable. A boundary not set disappears.` },
        { icon:"🔥", tag:"Snap back", cls:"bad", dw:+20, dc:0, aggro:1,
          text:`Wrong person? Then go find another one. We'll see who writes you an agent in a week.`,
          react:()=>`Are you threatening me? Me?! You know what...`,
          coach:`An ultimatum in response to an insult. Now it's not about the build anymore — it's about who outlasts whom.` },
        { icon:"🙇", tag:"Discount", cls:"meh", dw:0, dc:+3, fake:2,
          text:`Listen, I'll do this month at half price. Just let's skip the shouting, okay?`,
          react:()=>`...Half price. Well, it's something. But that doesn't cancel tomorrow, you understand that?`,
          coach:`You bought silence with money. The insult didn't go anywhere — and now the discount becomes the new expectation.` },
      ],
      next:"n3"
    },
    n3:{
      npc:s=> s.wall<55
        ? `...It's just that this investor is the last one who still believes in this project. If tomorrow's a flop — that's it, we shut down. That's why I'm losing it.`
        : `Fine. Tomorrow at ten. What do you actually have to show? Honestly, no "almost done."`,
      options:[
        { icon:"💙", tag:"Empathy", cls:"good", dw:-12, dc:+20,
          text:`So it's not just the build on the line — it's the whole project, and you're on your own right now, with borrowed money, depending on me. I hear that. That's genuinely scary.`,
          react:s=> s.wall>=60 ? `...Yeah. Pretty much.` : `...Yeah. Exactly that. Sorry I snapped. It's just piling up from every side.`,
          coach:`Behind every shout is fear. You named his fear without judgment — and for the first time in the conversation, he exhaled.` },
        { icon:"🛡", tag:"Reason it away", cls:"bad", dw:+12, dc:0,
          text:`Come on, you'll find another investor, there are plenty on Bali. Don't be so dramatic.`,
          react:()=>`"Don't be dramatic"?! You borrowed fifty grand and now you're lecturing me about being dramatic!`,
          coach:`"Don't be dramatic" means "your feelings are wrong." The wall only grows after that.` },
        { icon:"🗣", tag:"Honest state", cls:"good", dw:-5, dc:+15,
          text:`I feel awful that I let you down — and I want to make it right with action. Honestly: a stable build is Tuesday. But tonight I'll record a demo video of the agent actually playing. That might be enough for the first meeting.`,
          react:()=>`A demo video... Hm. Does it actually have something to show? No running in circles?`,
          coach:`An honest deadline plus a real alternative for tomorrow. That's responsibility — no self-flagellation, no fairy tales.` },
        { icon:"😅", tag:"Joke", cls:"meh", dw:+8, dc:0,
          text:`Well, on the bright side, we now have an agent that perfectly simulates procrastination. Almost human.`,
          react:()=>`Hilarious. I've got an investor tomorrow and you're doing stand-up.`,
          coach:`Humor eases tension once there's already contact. When there isn't, it sounds like indifference.` },
      ],
      next:"n4"
    },
    n4:{
      npc:()=>`Fine. Give me specifics: what will I have in hand tomorrow at ten, and what happens with deadlines after that. And no "I'll try," please.`,
      options:[
        { icon:"✅", tag:"Clear plan", cls:"good", dw:-5, dc:+20, endsRun:true,
          text:`By midnight tonight — an agent demo video plus last week's build, which is stable. Tuesday, 6 PM — the new build. And a new rule: if I see a risk of slipping, I tell you 48 hours ahead, not stay silent. This was my mistake, and it won't happen again.`,
          react:s=> s.contact>=60 ? `...Deal. Send the video when it's ready. And... thanks for not writing me off after "the wrong person." I went too far.` : `Okay. Video by midnight. We'll see.`,
          coach:`Specifics: what, when, and a new rule about early warnings. The silence about the risk was what broke trust — you fixed the cause, not just the symptom.` },
        { icon:"🤝", tag:"Plan + boundary", cls:"good", dw:-5, dc:+18, endsRun:true,
          text:`Demo tonight, build Tuesday at 6 PM. And let's agree going forward: I'll give deadlines with a buffer, and you call me without "the wrong person" — even when it's on fire. Otherwise we'll tear each other apart.`,
          react:s=> s.contact>=60 ? `...Honestly? Fair. Deal. Send the video.` : `We'll see. Video first, agreements after.`,
          coach:`You closed both tomorrow and the rules of the game going forward — for both sides. That's an adult agreement, not a surrender.` },
        { icon:"🌫", tag:"Vague", cls:"meh", dw:0, dc:+3, fake:1, endsRun:true,
          text:`I'll do everything possible to have something to show tomorrow. Trust me.`,
          react:()=>`"Everything possible"... I heard that on Monday too. Fine. We'll see.`,
          coach:`"Everything possible" is just another version of the "I'll try" he asked you not to say. Trust is repaired with specifics, not reassurance.` },
        { icon:"🙇", tag:"Heroic all-nighter", cls:"meh", dw:+3, dc:0, fake:1, endsRun:true,
          text:`I'm not sleeping tonight. There'll be a full build by nine AM, I swear.`,
          react:()=>`...Just don't bring me raw garbage, please. Better less, but working.`,
          coach:`A heroic promise with a high chance of failure. If there's a raw build at nine, that's the end of trust, not a rescue.` },
      ],
      next:null
    }
  },
  endings:{
    wall:{ emoji:"🧊", title:"Dial Tone", cls:"bad",
      text:`"You know what, I'm done with this." Dial tone. A minute later — a message: "We'll talk about the partnership after tomorrow's meeting." You sit there with the phone in your hand. You might finish the build. But what to do about this conversation, you no longer know.` },
    fight:{ emoji:"💥", title:"Breakup", cls:"bad",
      text:`You said everything to each other: the spec, the money, "I'll find someone else." Max hung up. In the morning a short message arrives: "Send the source code and an invoice for work actually done." A project you put half a year into ended on a Sunday evening.` },
    truce:{ emoji:"🌫", title:"Cave-in", cls:"meh",
      text:`You promised everything and then some — an all-nighter build, a discount, "everything possible." Max cooled off and hung up almost satisfied. And you sit there, jaw clenched: nobody set a boundary, and next time he'll open straight with "the wrong person." That's your new normal now.` },
    contact:{ emoji:"🤝", title:"Deal", cls:"good",
      text:`The demo video went out at 11:40 PM. In the morning Max wrote: "The investor liked it. He asked if he could meet the developer of the agent." You held through the shouting, didn't cave, didn't blow up — and named an honest deadline. Turns out that's exactly what professionalism sounds like.` },
  },
  debrief:`Three tools from this conversation: <b>own the fact</b> without self-flagellation (nothing left to argue with) → <b>boundary</b> ("about the facts — yes, about me — no") → <b>honest deadline + alternative</b> instead of heroic promises.<br><br>And the rule about unfairness: behind almost every shout is fear. But hearing his fear doesn't mean letting yourself be walked over. Empathy and boundaries only work together.`
});
