"use strict";
/* ---------- 7. Spa in Amed (builder) ---------- */
Amedi.stories.register("en","spa", {
  em:"🌺", title:"Spa in Amed", who:"Ibu Kadek", diff:"sentence builder",
  desc:"A couple's massage, one room — and one of the two therapists showed up sick. The massage is already over, and at the register they're asking if you enjoyed it. Telling the truth in the exact moment you're supposed to say \"everything's great.\"",
  storageKey:"spa_endings",
  mode:"builder",
  breatheBeat:"waits, patiently tapping her pen on the notebook.",
  hidden:true,
  endOrder:["care","swallow","blame","scene"],
  cast:[
    { key:"k", name:"Ibu Kadek", faces:[[78,"😟"],[56,"😐"],[38,"🙂"],[0,"😊"]] },
    { key:"you", name:"You", self:true, faces:[[62,"😤"],[44,"😠"],[26,"😮‍💨"],[0,"🙂"]] },
  ],
  start:{ w:{k:25, you:58}, contact:5 },
  extra:{ calm:3 },
  intro:`Amed, a small spa above the road. You booked an hour for two over WhatsApp — the manager replied fast, with emojis. On arrival they gave you both lemongrass tea and led you into a single room: two tables a meter apart, air conditioning, frangipani. Two therapists came in: Putu for you, Wayan for Teplynka. Putu was wonderful. But Wayan was sick — breathing through her nose with a wheeze the whole hour, sniffling, and coughing twice right over Teplynka, who was face-down in the headrest. You spent the whole hour a meter away from her, listening to that breathing and counting coughs instead of relaxing. The massage is over now. Teplynka is getting dressed and hasn't said a word.`,

  nodes:{
    /* --- prelude --- */
    n1:{
      narr:`You're tying your sarong. There's an uncomfortable mess inside: disappointment — the hour's ruined and you can't get it back — worry for Teplynka, who got coughed on all hour, and shame at being upset about it at all, because the woman isn't to blame for being sick. Teplynka's already got his shoes on: "It's fine, really, her hands were amazing." At the counter, Ibu Kadek is doing sums in a notebook and smiling — she's about to ask if you enjoyed it.`,
      acts:[
        { text:`Stand still for half a minute and name to yourself what you're actually feeling.`,
          did:`stand by the plant for half a minute and name it to yourself: disappointment, worry for Teplynka, and a bit of shame for both of you.`,
          icon:"🫁", tag:"Name it to yourself", cls:"good", d:{you:-28}, res:{calm:-1}, if:s=>s.calm>0, then:"n2",
          note:`Self-empathy first: an unnamed feeling runs you. Named, you can actually use it.` },
        { text:`Whisper to Teplynka and ask if you imagined it.`,
          did:`quietly ask Teplynka if he heard it too. "It's fine, come on," he says, not looking up.`,
          icon:"🤫", tag:"Seek confirmation", cls:"meh", d:{you:+6}, then:"n2",
          note:`You handed the verdict on your own experience to someone who spent the hour face-down in a headrest. He overruled it — and the coughing didn't go anywhere.` },
        { text:`Say "everything's great, thank you," pay, and leave.`,
          did:`smile, say "everything's great, thank you," pay the full amount for two, and walk out.`,
          icon:"🌫", tag:"Say nothing", cls:"bad", end:"swallow" },
        { text:`Pay, leave, and message the manager on WhatsApp from the scooter.`,
          did:`pay, walk out, and already on the scooter open WhatsApp to type everything you didn't say in there.`,
          icon:"📱", tag:"I'll write it later", cls:"bad", end:"blame" },
        { text:`Pay, leave, and leave a one-star review on Google Maps.`,
          did:`pay, walk out, and open the map app to leave one star.`,
          icon:"⭐", tag:"One star", cls:"bad", end:"blame" },
        { text:`Walk up to the counter and start talking right now.`,
          did:`walk up to the counter right now, with the knot in your chest still untangled.`,
          icon:"🗣", tag:"Right now", cls:"meh", if:s=>s.w.you>=45, then:"n3" },
      ]
    },

    n2:{
      narr:s=> s.w.you>=45
        ? `A little easier, but the knot's still there. You catch yourself thinking it'd be simpler to just say "everything was wonderful" — and then spend the whole evening deciding whether to message the manager, leave a star rating, or just never come back. Teplynka's already by the door.`
        : `Things quiet down inside. And now you notice something you didn't a minute ago: Wayan is folding towels very slowly, her face gray, and she's keeping as far from the counter as possible so she doesn't breathe on anyone. She really does look unwell — and she still showed up for work today.`,
      acts:[
        { text:`Breathe half a minute more while you figure out exactly what you want to say.`,
          did:`give yourself another half minute and work out what you actually want: not to punish, just to make sure it doesn't happen again.`,
          icon:"🫁", tag:"Formulate it", cls:"good", d:{you:-26}, res:{calm:-1}, if:s=>s.calm>0, then:"n3",
          note:`The difference between "this annoys me" and "I want them to warn us next time" is the difference between a complaint and a request.` },
        { text:`Walk up to Ibu Kadek and start talking.`,
          did:`walk up to the counter. Ibu Kadek sets down her notebook and turns to you.`,
          icon:"🗣", tag:"Start talking", cls:"good", then:"n3" },
        { text:`Ask Teplynka to say it for you.`,
          did:`ask Teplynka to say it instead of you. He shrugs: "What's there to say, I'm fine with it."`,
          icon:"🙈", tag:"Through someone else", cls:"bad", d:{you:+8}, end:"swallow",
          note:`A request passed through someone who doesn't hold it themselves goes nowhere. Only the person whose boundary it is can set it.` },
        { text:`Say "everything's great," pay, and leave.`,
          did:`say "everything's great, thank you," pay, and walk out.`,
          icon:"🌫", tag:"Say nothing", cls:"bad", end:"swallow" },
        { text:`Loudly enough for other guests to hear, ask if it's normal to schedule a sick therapist.`,
          did:`say it loud enough for the lobby to hear: "Is it normal to put a sick therapist on a client?" Two people in robes turn around.`,
          icon:"📣", tag:"For an audience", cls:"bad", d:{you:+10, k:+18}, if:s=>s.w.you>=45, then:"n3",
          note:`Public pressure isn't an argument. Now she's defending the business's face in front of witnesses, not solving your problem.` },
      ]
    },

    /* --- conversation --- */
    n3:{
      target:"k",
      npc:()=>`So, how was it? Everything good? Putu and Wayan — best hands in Amed, people come from Ubud for them.`,
      slots:[
        { label:"Observation", hint:"only what a recorder would have caught",
          frags:[
            { text:`Putu was wonderful. And Wayan, a meter away, breathed with a wheeze and coughed twice right over Teplynka.`, q:"good", dw:-10, dc:+12, heat:-5,
              note:`A clean fact, no diagnosis and no verdict, plus acknowledging what went well. Nothing here to dispute.` },
            { text:`You put a sick therapist on us, and she coughed over my boyfriend the entire hour.`, q:"bad", dw:+18, dc:0, heat:+8,
              note:`"You put on us" is already an indictment, not an observation. Now she's defending the business instead of hearing you.` },
            { text:`Wayan was clearly unwell the whole time, but she decided her shift mattered more than the clients' health.`, q:"bad", dw:+22, dc:0, heat:+10,
              note:`Mind-reading plus a motive you can't actually know. The fastest way to turn a living person into a villain.` },
            { text:`This is how it always is with you — get paid for two, and nothing else matters.`, q:"bad", dw:+20, dc:0, heat:+8,
              note:`"Always" about a first visit is no longer an observation, it's a verdict on the whole business. Her job now is to argue back.` },
          ] },
        { label:"Feeling", hint:"what was happening to you on that table",
          frags:[
            { text:`I spent the whole hour counting her coughs instead of even slightly relaxing.`, q:"good", dw:-12, dc:+15, heat:-5, needsCalm:true,
              note:`Your experience described from the inside. Impossible to argue with — and that's exactly why it's heard.` },
            { text:`I felt like you don't care about clients at all, as long as you get paid for the hour.`, q:"bad", dw:+20, dc:0, heat:+10,
              note:`After "I felt that..." comes a thought, not a feeling. This is an accusation dressed as vulnerability.` },
            { text:`I felt cheated and a little used, for four hundred thousand rupiah.`, q:"meh", dw:+8, dc:0, heat:+4,
              note:`"Cheated," "used" — not feelings, but verdicts about someone else's action. They automatically assign blame.` },
            { text:`I was shocked at the lack of hygiene here — I really didn't expect that.`, q:"bad", dw:+18, dc:0, heat:+8,
              note:`"Lack of hygiene" is a label that turns a sick woman into a code violation. Now it's about reputation, not about you.` },
          ] },
        { label:"Need", hint:"what's missing for you — not whose fault it is",
          frags:[
            { text:`I need to feel safe lying there with my eyes closed — and for Teplynka not to catch anything.`, q:"good", dw:-12, dc:+15, heat:-5, needsCalm:true,
              note:`The need is framed as yours, and there are many ways to meet it. That's why it doesn't sound like an order.` },
            { text:`I need sick therapists to just not work with clients — that's really all.`, q:"meh", dw:+6, dc:+3, heat:+2,
              note:`This is a strategy, not a need: one specific fix instead of the reason behind it. And it's costly, specifically for Wayan.` },
            { text:`I need you to finally start tracking and checking your staff for this kind of thing.`, q:"bad", dw:+24, dc:0, heat:+10,
              note:`"Finally start" is a jab at their competence, not a need. Guaranteed defensiveness.` },
            { text:`I need hygiene and a bit more attention paid to who gets scheduled for a massage.`, q:"meh", dw:-2, dc:+5, heat:0,
              note:`True, but too abstract: "hygiene" and "attention" mean something different to everyone. The more concrete the need, the easier to hear.` },
          ] },
        { label:"Request", hint:"a doable action going forward — the session's already over",
          frags:[
            { text:`Next time just message us on WhatsApp if a therapist is sick — we'll happily reschedule.`, q:"good", dw:-14, dc:+18, heat:-5, needsCalm:true,
              note:`The hour's gone, so the request looks forward: a concrete action through the same channel you used to book. Something she can say "yes" to.` },
            { text:`You have to refund us for this hour, both of us — I think that's pretty obvious here.`, q:"bad", dw:+16, dc:0, heat:+5,
              note:`"You have to" is a demand. Money isn't even the real issue here; the issue is that a demand gets met with defense.` },
            { text:`Just be more careful next time when you put together the day's schedule, okay?`, q:"meh", dw:+4, dc:+3, heat:0,
              note:`"Be more careful" can't be done or checked. Polite, and changes literally nothing.` },
            { text:`Either you do something about this right now, or I'm writing about it in reviews — you decide.`, q:"meh", dw:+12, dc:0, heat:+6,
              note:`A threat instead of a request. It might work — but from here on, she'll be dealing with you out of fear, not respect.` },
          ] },
      ],
      react:{
        good:()=>`(sets down her pen) ...Coughed? Over him? Oh. Oh, I'm so sorry. She told me it was just allergies, from the dust.`,
        mixed:()=>`Oh. Well... Wayan said it was just allergies. She's worked here twenty years, no one's ever complained.`,
        bad:()=>`Ma'am, we have the best therapists in Amed. If you weren't happy, I can call the owner, but there's no need for that tone.`,
      },
      next:"n4"
    },

    n4:{
      target:"k",
      npc:s=> s.w.k<40
        ? `(quieter) I'll tell you the truth. Today was supposed to be Putu and Komang. Komang went to a ceremony, and Wayan took her shift because we don't pay for days you don't work. She's the only one in her family earning money right now. I knew she was a little sick. I shouldn't have put her on.`
        : `I don't know what to tell you. Wayan's been in this profession twenty years, people come from Ubud for her. I can book you with someone else next time if you'd like, but I don't accept complaints.`,
      slots:[
        { label:"Observation", hint:"what she just said",
          frags:[
            { text:`You're saying days off aren't paid, and that Wayan took the shift herself.`, q:"good", dw:-10, dc:+12, heat:-3,
              note:`Her own words, reflected back with no interpretation. A person knows they're heard when their own phrase comes back to them.` },
            { text:`So you knew she was sick, and you put her on with Teplynka anyway.`, q:"bad", dw:+18, dc:0, heat:+8,
              note:`Technically accurate — and framed as a blow. She just took a step toward you, and got a verdict in return.` },
            { text:`So basically, your problems with paying sick leave became our problem for that hour.`, q:"bad", dw:+20, dc:0, heat:+8,
              note:`Logical and merciless. You just turned her openness into ammunition against her.` },
            { text:`She had a reason to come in today, and you knew that when you built the schedule.`, q:"meh", dw:+6, dc:+3, heat:+2,
              note:`Half fact, half accusation. "And you knew that" drags along an implied "so it's your fault."` },
          ] },
        { label:"Guess at her state", hint:"what's actually going on with her and with Wayan",
          frags:[
            { text:`This probably isn't easy for you either: sending her home means taking away a day's pay.`, q:"good", dw:-16, dc:+20, heat:-5, needsCalm:true,
              note:`Empathy for her real dilemma. Now you're not on opposite sides of the counter — you're both looking at the same uncomfortable situation.` },
            { text:`I feel for Wayan, and at the same time I'm worried Teplynka will get sick. Both are true.`, q:"good", dw:-10, dc:+14, heat:-4, needsCalm:true,
              note:`Two truths at once, without choosing between them. Compassion doesn't cancel out your own need — and doesn't have to.` },
            { text:`Your arrangements with staff aren't my concern, we're just customers here.`, q:"bad", dw:+22, dc:0, heat:+10,
              note:`You brushed off what she just opened up about. Next time you'll be told it's "just allergies."` },
            { text:`That's your internal business, and we paid for an hour of rest, not for this.`, q:"bad", dw:+18, dc:0, heat:+8,
              note:`Technically true. But empathy here isn't a concession: without it you'll get neither understanding nor a real solution.` },
          ] },
        { label:"Need", hint:"whose need matters most here",
          frags:[
            { text:`We both need clients to leave here rested, and Wayan not to lose a day's pay.`, q:"good", dw:-12, dc:+16, heat:-4, needsCalm:true,
              note:`A shared need instead of opposing positions: now you're solving one problem together, not deciding who's guilty.` },
            { text:`I need to know ahead of time if something's off — we can easily reschedule.`, q:"good", dw:-10, dc:+14, heat:-3,
              note:`Your own need, concrete and cheap for them to meet. Needs like that get met gladly.` },
            { text:`I need the owner to change your policy on paid sick leave for staff.`, q:"meh", dw:0, dc:+3, heat:0,
              note:`A fair idea, wrong address: this woman has no such authority. The conversation drifts to where nothing gets solved.` },
            { text:`I need you to admit this shouldn't have happened, and that it's your mistake.`, q:"bad", dw:+20, dc:0, heat:+8,
              note:`A need for surrender. Demanding an admission turns the conversation into a trial where someone has to lose.` },
          ] },
        { label:"Request", hint:"what exactly happens now",
          frags:[
            { text:`If someone's sick, message us on WhatsApp ahead of time and we'll reschedule. And send Wayan home today.`, q:"good", dw:-14, dc:+18, heat:-5, needsCalm:true,
              note:`An action for next time through the same channel, plus care for Wayan right now. Can't undo the session, but can protect the next one.` },
            { text:`Book us with Putu another time, and let Wayan not push through today for our sake.`, q:"good", dw:-8, dc:+12, heat:-2,
              note:`Concrete, and protects a third person: you're solving your own future without making Wayan the villain.` },
            { text:`Just promise me this won't happen again going forward, and that's it.`, q:"meh", dw:+6, dc:+3, heat:+2,
              note:`A promise with no mechanism. She just explained why it happened — and a promise doesn't fix a cause.` },
            { text:`Never mind, just forget the whole thing. I've already said everything I wanted to say.`, q:"bad", dw:+8, dc:-5, heat:+4,
              note:`You shut the conversation down right where it started working. Everything's said — and nothing's changed.` },
          ] },
      ],
      react:{
        good:()=>`(nods for a long time) Thank you for telling me. Really, thank you. People either come to me with "everything's wonderful" or with shouting. This — almost never.`,
        mixed:()=>`Alright. I'll book you with Putu next time. Thanks for telling me.`,
        bad:()=>`I'll call the owner. You can deal with him from here.`,
      },
      next:()=>null
    }
  },
  checkFail:s=> (s.w.k>=85 ? "scene" : null),
  resolve:(s)=>{
    if(s.contact>=55 && s.w.k<25) return "care";
    if(s.contact>=28) return "swallow";
    return "blame";
  },
  endings:{
    scene:{ emoji:"💥", title:"A Scene at the Reception", cls:"bad",
      text:`Voices rise, the lobby goes quiet, and two people in robes suddenly find the price list on the wall fascinating. Teplynka stands by the door staring at the floor. The owner comes out.<br><br>You might get the money back. But you leave more tense than you arrived, and in the back room Wayan is crying — she didn't understand a single word, only the tone.` },
    blame:{ emoji:"⭐", title:"Wrote It Later", cls:"bad",
      text:`At the register you said everything was wonderful. That evening you wrote it all out — what you didn't say there: detailed, fair, and to the right place.<br><br>The reply comes fast, full of apologies and three emojis. "We'll talk to her." They will: Wayan gets a fine or a lost shift, and next time she'll come in sick just the same — except now she won't tell anyone, because now she knows how that ends.<br><br>You got someone blamed and got nothing else: no peace about today, no guarantee the next massage won't be exactly the same. You won't go back to this spa, even though Putu really does have wonderful hands.` },
    swallow:{ emoji:"🌫", title:"\"Everything's Great, Thanks\"", cls:"meh",
      text:`You smile, say "everything's great," pay the full amount for two, and walk out into the heat. Teplynka immediately brightens: no scene, so it's fine.<br><br>The whole ride home you discuss what to do about it: message the manager on WhatsApp, leave a star rating, or just never come back. By evening you'll have done none of the three, and you'll check twice whether Teplynka's voice sounds off.<br><br>Nobody at that spa ever finds out what happened — which means the next client gets seated the exact same way.` },
    care:{ emoji:"🌺", title:"Now They Warn You", cls:"good",
      text:`The hour's gone, and you never asked for it back. Ibu Kadek thanks you like you've lifted a weight off her, and offers on her own to book you with Putu next time, no extra charge. She does send Wayan home — and as you leave, she says something you didn't expect: "Come back to her once she's better. She'll be glad you're not angry."<br><br>Starting the following week, the manager begins messaging ahead of time on WhatsApp: "one of our therapists is sick today — reschedule, or a different one?" A small thing that didn't exist before — and exactly the thing you wanted.<br><br>You told the truth at the exact moment everyone says "everything's wonderful" — and nobody had to become the villain for it.` },
  },
  debrief:`This conversation is about the most common trap for polite people: <b>either lie and say "everything's great," or find someone to blame</b>. And now you can find that someone remotely — over WhatsApp or on a map app, without ever looking anyone in the eye. The third option — telling the truth right there, in a way that doesn't destroy anyone — looks impossible until you try it.<br><br>A particular difficulty in this scene: <b>nothing can be fixed anymore</b>. The massage is over, the hour's gone. So a "strong" request here doesn't look backward (a refund, a redo) but forward: a warning next time. When the damage can't be undone, the only request that works is about what's still ahead.<br><br>The key is that <b>behind "bad service" there's almost always someone's need</b>: Wayan took someone else's shift not out of disrespect, but because an unworked day isn't paid. That doesn't cancel your need — and yours doesn't cancel hers. The strongest move in the game is exactly this: "I feel for Wayan, and at the same time I'm afraid Teplynka will get sick — both are true."<br><br>The traps are the same as in the dive story, dressed in politeness: <b>judgment instead of observation</b> ("you put a sick woman on us"), <b>a thought as a feeling</b> ("I felt like you don't care"), verdict-words ("cheated," "used"), <b>strategy instead of need</b> ("sick people shouldn't work shifts"), and <b>threat instead of request</b> ("either you do something, or I write a review"). Plus three endings that look like actions but function as escape: staying silent, messaging the manager, and leaving a star rating.`
});
