"use strict";
/* ---------- 6. After the Dive (builder) ---------- */
Amedi.stories.register("en","divemaster", {
  em:"🤿", title:"After the Dive", who:"Marek", diff:"sentence builder",
  desc:"First it's not about words but about actions — what state you're even in when you approach him. Then you build the sentence yourself, out of four parts.",
  storageKey:"dive_endings",
  mode:"builder",
  breatheBeat:"waits, turning his mask over in his hands a little awkwardly.",
  hidden:true,
  endOrder:["brief","smoothed","cold","scene"],
  cast:[
    { key:"m", name:"Marek", faces:[[80,"🤬"],[58,"😤"],[42,"😒"],[24,"😐"],[0,"🙂"]] },
    { key:"you", name:"You", self:true, faces:[[70,"🤬"],[50,"😠"],[30,"😮‍💨"],[0,"🙂"]] },
  ],
  start:{ w:{m:30, you:78}, contact:5 },
  extra:{ calm:3 },
  intro:`Amed, a dive site near Jemeluk. You and Marek — he's an instructor at the center, and you've been going on fun dives with him for six months — planned for 24 meters. At 28 you showed him your computer; he flashed an "okay" and kept going, down to 31. Your air lasted just barely, you hung at the safety stop on fumes counting seconds.`,

  nodes:{
    /* --- prelude: actions, not words --- */
    n1:{
      narr:`The boat. You just climbed out, sitting on the bench with your mask in your hands. Your heart's pounding somewhere in your throat, your fingers won't work the buckle, there's ringing in your ears. Anger rises in waves — and with it something like shame, because you're the one who followed him down there. Marek's three meters away, laughing with the captain, hands sketching the size of a turtle. He clearly has no idea anything happened.`,
      acts:[
        { text:`Look at the water and breathe: four breaths in, four out, longer on the exhale.`,
          did:`sit facing the water and breathe. Four counts in, six out. Your hands stop shaking.`,
          icon:"🫁", tag:"Breathe", cls:"good", d:{you:-30}, res:{calm:-1}, if:s=>s.calm>0, then:"n2",
          note:`Physiology goes first: while adrenaline's in your blood, the cortex works worse — and the most precise words simply don't come.` },
        { text:`Drop your fins onto the deck loudly enough for everyone to turn around.`,
          did:`throw your fins onto the deck. A crash. The captain turns, Marek doesn't.`,
          icon:"💢", tag:"Bang", cls:"bad", d:{you:+8, m:+5}, then:"n2",
          note:`Noise instead of words is a bet that the other person will guess for themselves. They rarely do — but they defend themselves immediately.` },
        { text:`Shove the tank crate so it slams against the rail.`,
          did:`shove the crate of tanks. It slams against the rail with a crash. Someone in the group flinches.`,
          icon:"🤬", tag:"Aggression", cls:"bad", d:{you:+12, m:+8}, if:s=>s.w.you>=65, then:"n2",
          note:`A fantasy where a person guesses your thought, your need, and what to do about it all from your gesture. They won't guess it — they'll just see a dangerous person.` },
        { text:`Pack your gear and go home without saying a word.`,
          did:`silently pack your gear, throw it in the pickup, and leave. Marek waves at you — you don't turn around.`,
          icon:"🚶", tag:"Leave", cls:"bad", end:"cold" },
        { text:`Walk up to Marek and start talking right now.`,
          did:`stand up and walk over to him right now, hands still shaking.`,
          icon:"🗣", tag:"Straight into it", cls:"meh", if:s=>s.w.you>=55, then:"n3",
          note:`Sometimes this works. But notice what will and won't be available to say with a pulse like this.` },
      ]
    },

    n2:{
      narr:s=> s.w.you>=55
        ? `A little easier, but it's still ringing inside. You keep replaying his "okay" at twenty-eight, and each time the anger comes back. Marek's already pulling off his wetsuit, reaching for water.`
        : `Your pulse has settled. The anger hasn't disappeared, but now it feels less like an explosion and more like something heavy and cold under your ribs. You notice Marek looks gray and is moving very slowly — you hadn't seen that before.`,
      acts:[
        { text:`Breathe once more while you figure out exactly what you want to say.`,
          did:`do one more full breathing cycle while composing the first sentence in your head.`,
          icon:"🫁", tag:"Breathe", cls:"good", d:{you:-28}, res:{calm:-1}, if:s=>s.calm>0, then:"n3",
          note:`The second cycle gives you something the first didn't: room to think. Now you're not just calmer — you also know where to start.` },
        { text:`Walk up to Marek and start talking.`,
          did:`walk up to him and sit down next to him on the bench.`,
          icon:"🗣", tag:"Start talking", cls:"good", then:"n3" },
        { text:`Message the center owner about it, without talking to Marek.`,
          did:`take out your phone and start writing to Agnieszka, the center owner.`,
          icon:"📱", tag:"Over his head", cls:"bad", end:"cold",
          note:`Complaining over someone's head resolves your anxiety but not your actual problem: the person you dive with learns about your boundaries from management.` },
        { text:`Tell yourself nothing bad happened, and go grab a beer with the group.`,
          did:`convince yourself it's fine and go join the group for a cold beer.`,
          icon:"🌫", tag:"Swallow it", cls:"bad", end:"smoothed",
          note:`What's swallowed doesn't vanish — it settles. Next time you'll either avoid diving with him, or dive with him already angry before you're even in the water.` },
        { text:`Shove the tank crate so it slams against the rail.`,
          did:`shove the tank crate — a crash across the whole boat.`,
          icon:"🤬", tag:"Aggression", cls:"bad", d:{you:+12, m:+8}, if:s=>s.w.you>=65, then:"n3",
          note:`This move is only available while you're in this state. Calm down, and even the thought of it disappears.` },
      ]
    },

    /* --- conversation: builder --- */
    n3:{
      target:"m",
      npc:()=>`So, that was beautiful, huh? Did you see the turtle at thirty? Huge, like a manhole cover.`,
      slots:[
        { label:"Observation", hint:"only what a camera would have caught",
          frags:[
            { text:`We planned twenty-four. At twenty-eight I showed you my computer, you gave me an "okay" and kept going deeper.`, q:"good", dw:-10, dc:+12, heat:-5,
              note:`A clean fact: numbers and gestures, no judgment. Nothing here to argue with — only to check.` },
            { text:`You blew off the dive plan and pushed to thirty-one, even though we'd agreed on twenty-four meters.`, q:"bad", dw:+16, dc:0, heat:+8,
              note:`"Blew off" is a judgment, not an observation. The numbers are right, but the first word is already a verdict, and that's all he'll hear next.` },
            { text:`You decided to show off for the new girl on the boat and dragged me down to thirty-one with you.`, q:"bad", dw:+22, dc:0, heat:+10,
              note:`Mind-reading. You assigned a motive you can't actually know — and now he's defending his reputation instead of listening about the depth.` },
            { text:`You always drag the group deeper than planned, and today was just the same thing as always.`, q:"bad", dw:+18, dc:0, heat:+6,
              note:`"Always" is a generalization. It erases every time he did it right, and he'll start listing them right back at you.` },
          ] },
        { label:"Feeling", hint:"what was happening in your body, not a thought about it",
          frags:[
            { text:`I got scared. At the safety stop my hands were shaking and I was counting seconds.`, q:"good", dw:-12, dc:+15, heat:-5, needsCalm:true,
              note:`A real feeling plus a bodily fact. Impossible to dispute — and that's exactly why it lands.` },
            { text:`I felt like you don't give a damn about the group and don't consider us people at all.`, q:"bad", dw:+20, dc:0, heat:+10,
              note:`A classic swap: after "I felt that..." what usually follows is a thought, not a feeling. It's an accusation wearing vulnerability's clothes.` },
            { text:`I felt abandoned and used down there, on the bottom, with my air running out.`, q:"meh", dw:+8, dc:0, heat:+4,
              note:`"Abandoned," "used," "betrayed" — not feelings, but verdicts about someone else's actions. They automatically assign blame.` },
            { text:`I was furious at your recklessness and at how you're playing it off right now.`, q:"bad", dw:+18, dc:0, heat:+12,
              note:`The anger is named, but immediately glued to his "recklessness." A feeling turned into an indictment.` },
          ] },
        { label:"Need", hint:"what's missing for you — not what he should do",
          frags:[
            { text:`I need predictability underwater — without it I can't trust a dive buddy.`, q:"good", dw:-12, dc:+15, heat:-5, needsCalm:true,
              note:`The need is framed as yours. It can be met in many ways — which is why it doesn't sound like an order.` },
            { text:`I need you to stick to the plan we agreed on before the dive.`, q:"meh", dw:+6, dc:+3, heat:+2,
              note:`This is a strategy, not a need: one specific way instead of the reason behind it. Easy to hear as a demand.` },
            { text:`I need you to finally grow up and take responsibility for people in the water.`, q:"bad", dw:+24, dc:0, heat:+10,
              note:`A need disguised as a diagnosis. This isn't about the dive anymore — it's about what's wrong with him as a person.` },
            { text:`I need safety when I'm paired with someone at that kind of depth.`, q:"meh", dw:-2, dc:+5, heat:0,
              note:`True, but too abstract: everyone pictures their own version of "safety." The more concrete the need, the easier it is to hear.` },
          ] },
        { label:"Request", hint:"a doable action he can answer 'yes' or 'no' to",
          frags:[
            { text:`Let's talk through max depth and who's leading, and treat an "up" signal as non-negotiable. Deal?`, q:"good", dw:-12, dc:+18, heat:-5, needsCalm:true,
              note:`Specific, doable, and ends with a question. A request that can be answered "no" is the only kind that isn't a demand.` },
            { text:`You have to never do that again — not to me, not to anyone else in the group. This is basic stuff.`, q:"bad", dw:+16, dc:0, heat:+5,
              note:`"You have to" is a demand. To a demand, people respond with submission or rebellion; both kill the conversation.` },
            { text:`Just be more careful next time down there, okay? That's all I'm asking.`, q:"meh", dw:+4, dc:+3, heat:0,
              note:`"Be more careful" can't be done or checked. In a week neither of you will know if it happened.` },
            { text:`Either you stick to the dive plan, or I'm not diving with you anymore — your call.`, q:"meh", dw:+10, dc:0, heat:+6,
              note:`This is a real boundary, and you might need it if nothing changes. But as an opening line, it's an ultimatum: you raised it before he even had a chance to respond.` },
          ] },
      ],
      react:{
        good:()=>`(the smile slides off his face) ...Wait. You were showing me your computer? At twenty-eight?.. Damn. I thought you were pointing at the turtle.`,
        mixed:()=>`Come on, twenty-eight isn't even deep. I was right there the whole time, I could see you.`,
        bad:()=>`Whoa. Here we go. So I almost killed you, is that it? You followed me down there yourself, nobody dragged you on a rope.`,
      },
      next:"n4"
    },

    n4:{
      target:"m",
      npc:s=> s.w.m<45
        ? `(sits down on the bench) Listen... I genuinely didn't notice. This is my fourth dive today. Five yesterday. I'm running on autopilot at this point.`
        : `Listen, I've been diving twenty years. Twenty. Not a single incident. And you've been doing this six months and you're teaching me how to plan a dive?`,
      slots:[
        { label:"Observation", hint:"what he just said or did",
          frags:[
            { text:`You're saying this is your fourth dive today and that you're running on autopilot.`, q:"good", dw:-10, dc:+12, heat:-3,
              note:`You repeated his own words with no interpretation added. A person knows they've been heard when they hear their own phrase reflected back.` },
            { text:`You're using exhaustion as an excuse instead of just admitting a mistake.`, q:"bad", dw:+18, dc:0, heat:+8,
              note:`"Using as an excuse" is a label on his words. He just admitted a weakness, and you called it a maneuver.` },
            { text:`Twenty years of experience — and he still missed a buddy signal at twenty-eight meters.`, q:"bad", dw:+20, dc:0, heat:+8,
              note:`Technically a fact, but framed as a blow: you took the thing he's proud of and used it against him.` },
            { text:`This is your fourth dive today, and the season's been going two months straight with no day off.`, q:"good", dw:-8, dc:+10, heat:-2,
              note:`A broader fact, no judgment: you're looking at his situation, not just your own.` },
          ] },
        { label:"Guess at his state", hint:"what's actually happening with him",
          frags:[
            { text:`This probably scares you more than it scares me: missing a signal on autopilot when you're the one responsible for people.`, q:"good", dw:-16, dc:+20, heat:-5, needsCalm:true,
              note:`An empathic guess at his fear. Even imperfect, it shows: you're on his side, not against him.` },
            { text:`I'm still shaken, and I want to resolve this, not fight with you on the boat.`, q:"good", dw:-10, dc:+14, heat:-4, needsCalm:true,
              note:`Honest about yourself, plus a clear intent. Naming your intent out loud is a strong move: it takes the "attack" suspicion off the table.` },
            { text:`I don't care how many dives you've done today — your schedule isn't my problem.`, q:"bad", dw:+22, dc:0, heat:+10,
              note:`You brushed off what he just opened up about. He won't open up again next time.` },
            { text:`I'm not obligated to consider your situation, I paid for a dive and for safety.`, q:"bad", dw:+18, dc:0, heat:+8,
              note:`Technically true. But empathy isn't a favor or an obligation — it's the only way to get heard back in return.` },
          ] },
        { label:"Need", hint:"whose need matters most here",
          frags:[
            { text:`We both need to be able to trust each other underwater — you as much as me.`, q:"good", dw:-12, dc:+16, heat:-4, needsCalm:true,
              note:`A shared need instead of opposing positions. Now it's the two of you against the problem, not each other.` },
            { text:`I need to know you'll see me when I signal underwater.`, q:"good", dw:-10, dc:+14, heat:-3,
              note:`Your own need, concrete and checkable. No accusation about him failing to meet it before.` },
            { text:`I need the center to stop scheduling you for four or five dives a day in season.`, q:"meh", dw:0, dc:+3, heat:0,
              note:`A fair point, but it's a need about third parties. The conversation drifts from the two of you to the center's management.` },
            { text:`I need you to admit you were wrong — otherwise none of this means anything.`, q:"bad", dw:+20, dc:0, heat:+8,
              note:`This is a need for surrender. Demanding an admission turns the conversation into a trial where he has to lose for you to win.` },
          ] },
        { label:"Request", hint:"what exactly you do next",
          frags:[
            { text:`Let's do this: thirty seconds before the dive — max depth, gas, who leads. Try it Thursday?`, q:"good", dw:-14, dc:+18, heat:-5, needsCalm:true,
              note:`Time, action, and a date to test it. A request like this can be done — and checked in a week.` },
            { text:`And tell Agnieszka not to schedule you for a fourth dive — I'll bring it up with her too.`, q:"good", dw:-8, dc:+12, heat:-2,
              note:`A request that treats the cause, not the symptom, and takes some of it onto yourself. Weaker than the first, but honest.` },
            { text:`Just promise me it won't happen again, on any dive, and let's close the subject.`, q:"meh", dw:+6, dc:+3, heat:+2,
              note:`A promise with no mechanism. He just explained he's running on autopilot — and a promise doesn't reprogram an autopilot.` },
            { text:`Never mind, forget it. I already said what I wanted to say, I won't repeat it.`, q:"bad", dw:+8, dc:-5, heat:+4,
              note:`You shut the conversation down midway. Nothing changed — except that now you don't trust yourself with this pair anymore.` },
          ] },
      ],
      react:{
        good:()=>`(silent, then nods) You know, in twenty years nobody's ever told me that this way. Usually people either scream, or go quiet and never come back.`,
        mixed:()=>`Alright, alright. I get it, I'll be more careful. Let's just drop it.`,
        bad:()=>`Listen, maybe you should find yourself another instructor. Since I'm apparently so dangerous.`,
      },
      next:()=>null
    }
  },
  checkFail:s=> (s.w.m>=85 ? "scene" : null),
  resolve:(s)=>{
    if(s.contact>=55 && s.w.m<30) return "brief";
    if(s.contact>=28) return "smoothed";
    return "cold";
  },
  endings:{
    scene:{ emoji:"💥", title:"A Scene on the Boat", cls:"bad",
      text:`You're arguing so loudly the captain cuts the engine, and two newbies suddenly find their fins fascinating. Marek throws out something about twenty years without a single problem, you throw back something about his turtle.<br><br>You come ashore in silence. That evening the center owner will message you both separately. The worst part isn't even that: dive plans at this center were being ignored before and will keep being ignored — just without you now.` },
    cold:{ emoji:"🧊", title:"A Chill", cls:"bad",
      text:`You stop diving together. Formally, nothing happened: you still say hi, joke around, he even offers you a discounted tank.<br><br>But you'll never pair with him again — and at the center, nobody's talking through max depth before a dive, still. Because the one person who tried to bring it up did it in a way that couldn't be heard. Or didn't bring it up at all.` },
    smoothed:{ emoji:"🌫", title:"Smoothed Over", cls:"meh",
      text:`"Alright, got it, I'll be more careful." You shake hands, and formally everything's fine.<br><br>Two weeks later, on another dive, he goes past the plan again — not out of malice, just because it's his fourth dive that day and he's on autopilot. There was a promise, no mechanism. And this time you won't say anything, because "we already talked about this."` },
    brief:{ emoji:"🤿", title:"A New Briefing", cls:"good",
      text:`On Thursday, Marek starts doing something he never used to: thirty seconds before the dive — max depth, gas, who leads, and the line "anyone can call an up-signal, no questions asked." Within a month it's part of the whole center's briefing, and nobody remembers where it came from.<br><br>On the boat, pulling off his fins, he says: "Hey, glad you didn't just let it go back then." You didn't let it go — and you didn't explode either. Turns out there was room for both.` },
  },
  debrief:`Two things were being tested here. First: not to <b>recognize</b> the right answer from a list, but to <b>build</b> it yourself — in real life, nobody hands you four options with one good one.<br><br>Second — the <b>prelude</b>. Before a single word, you had to choose not a sentence but an action: walk over, bang something, leave, breathe. And the state you approached in determined what you could <i>physically</i> say next: half of the precise phrasings simply don't show up in an enraged mind. That's why self-empathy in Rosenberg's model comes <i>before</i> the four steps.<br><br>Four classic traps, one per slot: <b>judgment instead of observation</b> ("blew off," "always"); <b>a thought wearing feeling's clothes</b> ("I felt like you don't give a damn") and verdict-words ("abandoned," "used"); <b>strategy instead of need</b>; <b>demand instead of request</b> ("you have to") or a request that can't be checked ("be more careful").<br><br>And the main rule of building a sentence: <b>the worst part decides the whole thing</b>. Flawless feelings, need, and request don't save you if the observation opened with an accusation — after that, the person's already defending, and won't hear the rest.`
});
