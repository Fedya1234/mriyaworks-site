"use strict";
/* ---------- 3. Call Home ---------- */
Amedi.stories.register("en","mama", {
  em:"📞", title:"Call Home", who:"Mom", diff:"deepest",
  desc:"A video call to Ukraine. \"The neighbor's Tolik visits every week, and my son...\" Six years, three thousand kilometers, and one person who misses you.",
  storageKey:"mama_endings",
  start:{wall:45,contact:15},
  intro:`Saturday afternoon on Bali — morning in Kyiv. You haven't called your mom in three weeks: first the freediving course, then the release, then it somehow got awkward because you'd gone so long without calling. Six years since you left. She's never seen the sea you dive in, or the person you live with. Ring. Ring again. "Oh, finally..."`,
  nodes:{
    n1:{
      npc:()=>`Oh, finally. I thought you'd lost my number. Lyuda's Tolik comes from Warsaw every week, dug up her garden for her. And mine — calls once a month, and even then it's like scheduling an appointment with a ministry.`,
      options:[
        { icon:"🛡", tag:"Defense", cls:"bad", dw:+15, dc:0,
          text:`Mom, come on, here we go. From Warsaw it's a night's drive, from Bali it's three days and fifteen hundred dollars. That's a slightly different thing, you'd agree.`,
          react:()=>`And who chased you overseas? Lyuda says: we've got our own IT people now, our own sea in Odesa...`,
          coach:`You answered the words, not the pain. Now she's defending her hurt with facts — and she has more of them.` },
        { icon:"🔥", tag:"Irritation", cls:"bad", dw:+22, dc:0, aggro:1,
          text:`Mom, if you want this whole call to be about Tolik, I can call back when he's gone.`,
          react:()=>`Well then. Can't even say a word to you anymore. Sorry for bothering you.`,
          coach:`Sarcasm in response to a jab. She's hurt now — and the conversation hangs by a thread.` },
        { icon:"💙", tag:"Empathy", cls:"good", dw:-18, dc:+15,
          text:`You miss me. And it's probably hurtful — the neighbor's son shows up every week, and yours is just a voice in the phone once a month. I really haven't called in a long time, Mom.`,
          react:s=> s.wall>=60 ? `...Never mind all that. Tell me why you're calling.` : `...I'm not reproaching you, sweetheart. I just... well, I missed you, that's all. Sitting here looking at you through the phone.`,
          coach:`Behind "Tolik" isn't a complaint but "I miss you." You answered that — and the reproach dissolved.` },
        { icon:"💸", tag:"Buy her off", cls:"meh", dw:+3, dc:+3, fake:1,
          text:`Mom, I'll send you some money today, buy yourself something nice and don't be sad, okay?`,
          react:()=>`I don't need your money, I have everything I need. I need you, not your transfers.`,
          coach:`Money is your language of care. But she just told you directly what kind of care she actually needs.` },
      ],
      next:"n2"
    },
    n2:{
      enter:{dw:+6, note:"Mom doesn't hold back — three weeks of gathered hurt comes out on its own"},
      npc:s=> s.wall<55
        ? `Miss you... I'm used to being alone by now. My blood pressure's acting up again, prices at the pharmacy are outrageous, at least Lyuda stops by to check if I'm still alive here. And you're out there diving away... deep enough for you?`
        : `What does it matter what happens to me. Getting by, that's all. Pressure's acting up, well, whatever — who cares about that.`,
      options:[
        { icon:"😔", tag:"Guilt", cls:"meh", dw:+3, dc:+3, fake:1,
          text:`Mom, don't say that, I feel like a terrible son. I know I'm not there, I get it, I really do...`,
          react:()=>`What terrible, what are you even saying. You're the best. It's me who's old now, grumbling...`,
          coach:`Your guilt made her comfort you instead. You swapped roles — and her loneliness went unattended again.` },
        { icon:"💙", tag:"Hear the fear", cls:"good", dw:-16, dc:+20,
          text:`Mom, wait. You're lonely and scared — your pressure's spiking and none of your family's nearby. And you want to know I'm with you, even from far away. Is that it?`,
          react:s=> s.wall>=60 ? `...Well, of course. Of course I want that.` : `...Yes, sweetheart. That's exactly it. I'm not against your Bali. I'm against feeling like I'm not needed anymore.`,
          coach:`Under "the pharmacy" and "Lyuda" is fear and loneliness. You named them — and for the first time in the call, she's talking instead of scolding.` },
        { icon:"🛡", tag:"Change the subject", cls:"meh", dw:+5, dc:0, fake:1,
          text:`What does the doctor say about your blood pressure? Are you taking those pills I ordered?`,
          react:()=>`I take them, I take them. Doctor says it's nerves. And there's no pill for nerves, he says...`,
          coach:`Caring about her blood pressure is good. But you shifted from feelings to medicine — safer ground for you.` },
        { icon:"🔥", tag:"Weary snap", cls:"bad", dw:+18, dc:0, aggro:1,
          text:`Mom, come on, it's always the same — pressure, pharmacy, Lyuda. Can we talk normally for once?`,
          react:()=>`Well, this is my life — pressure, pharmacy, and Lyuda. Nothing else got delivered. Sorry it's not Bali.`,
          coach:`Her daily life is her actual life. Dismiss it, and you dismiss her too.` },
      ],
      next:"n3"
    },
    n3:{
      npc:s=> s.wall<55
        ? `...I'm not asking for anything, sweetheart. I just don't understand how you're doing over there. Six years — I haven't even seen where you live. Are you happy there, at least? Just be honest.`
        : `Fine, whatever. Tell me quickly how you're doing, since you probably have things to do.`,
      options:[
        { icon:"🗣", tag:"Honesty", cls:"good", dw:-10, dc:+22,
          text:`Honestly? I'm happy. I finally have a sea I actually listen to, work I find interesting, and someone who makes me feel warm. And it hurts that you only know all this from my words. I want you to see it.`,
          react:s=> s.wall>=60 ? `...Well, at least you're happy, that's something.` : `...Oh. Thank god. That's all I want, for you to be happy. Will you show me that sea of yours? Even just on the phone?`,
          coach:`Honest happiness isn't a betrayal of the people far away. You said both the joy and the pain of the distance — that's the whole truth.` },
        { icon:"🌫", tag:"Formal", cls:"meh", dw:+3, dc:+3, fake:1,
          text:`It's all fine, Mom. Working, diving a little. Same as always, nothing much to tell.`,
          react:()=>`"Fine"... Well, okay then. Everything's fine on my end too, I guess.`,
          coach:`She asked if you're happy — and got a status report. Your "fine" got mirrored right back at you.` },
        { icon:"😅", tag:"Joke", cls:"meh", dw:+5, dc:0,
          text:`Happy, Mom, happy. Tanned, feeling younger, about to turn into a fish — gills are already growing in.`,
          react:()=>`Everything's a joke to you. I'm asking seriously and he tells me about gills.`,
          coach:`She took a risk asking about what really matters — and a joke shut that door. She only does this once every six months or so.` },
        { icon:"🛡", tag:"Counter-jab", cls:"bad", dw:+15, dc:0,
          text:`Have you ever once asked without leading with "Tolik"? Maybe that's why I don't tell you anything.`,
          react:()=>`...I see. So it's my fault after all. Well, sorry, this is the mother you've got.`,
          coach:`Maybe true. But said as a counter-strike, it becomes an accusation — and she shuts down.` },
      ],
      next:"n4"
    },
    n4:{
      npc:()=>`...Well, alright, sweetheart. You're probably busy. Call sometimes, okay? Don't forget your old mother.`,
      options:[
        { icon:"✅", tag:"Concrete ritual", cls:"good", dw:-5, dc:+20, endsRun:true,
          text:`Mom, let's do this: every Sunday, ten in the morning your time — our call. I'm putting it in the calendar right now, look — I'm putting it in. And tomorrow I'll call you from the beach and show you the sea. And I'll finally introduce you to Vedmezhatko, she's been asking for ages.`,
          react:s=> s.contact>=60 ? `...Every Sunday? Oh... well, look, you said it yourself, now I'll be waiting! Show me the sea and your girl! I'll tell Lyuda...` : `Well, if it works out, sweetheart, if it works out. I understand, you're busy.`,
          coach:`Not "I'll call more often," but a day, a time, and a promise for tomorrow. For someone who waits, a schedule is love.` },
        { icon:"✈️", tag:"Big plan", cls:"good", dw:-5, dc:+18, endsRun:true,
          text:`Mom, let's seriously think about you coming here for a month, once flight prices ease up. I'll organize everything — visa, tickets, I'll meet you. You'll see the sea, the house, and the person I love. This isn't "someday" — let's do December.`,
          react:s=> s.contact>=60 ? `...Oh, where would I even fly to, I'm old now... And... what about the visa? Who'll watch the cat?.. Are you serious, sweetheart?` : `What flying, sweetheart. You come here instead... someday.`,
          coach:`"Come visit me" is a request she wouldn't dare voice first. You voiced it for her — with a date.` },
        { icon:"🌫", tag:"Vague", cls:"meh", dw:0, dc:+3, fake:1, endsRun:true,
          text:`I'll call more often, Mom, I promise. You take care over there, okay?`,
          react:()=>`Okay, sweetheart. You take care too. Well, bye now...`,
          coach:`"More often" is a word that promises nothing. In three weeks of silence, it'll become just one more piece of evidence.` },
        { icon:"🛡", tag:"Escape", cls:"meh", dw:+5, dc:0, fake:1, endsRun:true,
          text:`Yeah, Mom, I need to run. Call if anything urgent comes up, okay?`,
          react:()=>`Go on, go on. Your day's just getting started over there... Alright, love you, bye.`,
          coach:`"Call if it's urgent" — she won't call. For her, urgent means it's already too late.` },
      ],
      next:null
    }
  },
  endings:{
    wall:{ emoji:"🧊", title:"\"Well, take care\"", cls:"bad",
      text:`"Alright, I won't keep you. Take care." The screen goes dark. You sit there with the phone: the call lasted eleven minutes, and you spent ten of them defending yourselves from each other. Right now she's telling Lyuda that "my son's busy, but he's fine." The next call will be even harder.` },
    fight:{ emoji:"💥", title:"Hurt", cls:"bad",
      text:`"Sorry to have bothered you. I won't again." She hung up first. Now for a week she won't pick up "because she's busy," and you'll carry a mix of anger and guilt in your chest — the family's signature cocktail, recipe long forgotten.` },
    truce:{ emoji:"🌫", title:"Just Another Call", cls:"meh",
      text:`You talked about blood pressure, prices, Lyuda. Said warm goodbyes. Everything's "fine." Only the main thing didn't happen again: she doesn't know if you're happy, you don't know how lonely she is. Just another call added to the collection of ordinary calls. Six years of them.` },
    contact:{ emoji:"☀️", title:"Sweetheart", cls:"good",
      text:`You talked for an hour and twenty minutes. She cried once — when you mentioned Sunday. Then she wrote it in her paper notebook: "Sunday, 10:00." Tomorrow you'll call her from the beach, and for the first time in six years she'll see your sea. And she'll tell Lyuda. Oh, she'll tell Lyuda.` },
  },
  debrief:`The key to this conversation: <b>a reproach is love that doesn't know how to ask</b>. Behind "Tolik" — "I miss you," behind "the pharmacy" — "I'm scared alone." Respond to the translation, not the words.<br><br>And about the ending: for someone waiting, a concrete ritual ("every Sunday at ten") matters more than any "more often." A schedule is love, when three thousand kilometers separate you.`
});
