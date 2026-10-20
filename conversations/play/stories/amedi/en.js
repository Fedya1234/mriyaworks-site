"use strict";
/* ---------- 1. Evening in Amed ---------- */
Amedi.stories.register("en","amedi", {
  em:"🌅", title:"Evening in Amed", who:"Vedmezhatko", diff:"warm-up",
  desc:"You forgot about the sunset you promised at Jemeluk. Vedmezhatko waited two hours. Classic domestic diplomacy.",
  storageKey:"amedi_endings",
  start:{wall:40,contact:10},
  intro:`Amed, Bali. Nine in the evening. You're coming back from a fun dive — you got out of the water late, then spent ages washing gear, then the instructor called everyone for coffee. Your phone died sometime during the day. Halfway home you remember: tonight you and Vedmezhatko were supposed to watch the sunset at Jemeluk. That was two hours ago. A lamp is burning on the terrace. Vedmezhatko is sitting with a cup of tea, phone screen-down on the table.`,
  nodes:{
    n1:{
      npc:()=>`Oh. You're alive. I already called the dive center — figured at least they'd know where you were. Dinner's in the kitchen, if you want it. Cold.`,
      options:[
        { icon:"🛡", tag:"Excuse", cls:"bad", dw:+12, dc:0,
          text:`Babe, my phone died, and we got out of the water late — there was a current, I physically couldn't warn you.`,
          react:()=>`There's always something with you. Currents, tanks, gear. I know the list by heart now.`,
          coach:`An excuse is self-defense. Her two hours of worry go unheard, so the wall keeps growing.` },
        { icon:"🔥", tag:"Attack", cls:"bad", dw:+25, dc:0, aggro:1,
          text:`I've been in the sea all day, tired as hell. Can we skip the interrogation, just for tonight?`,
          react:()=>`Interrogation?.. Okay. No interrogation. No anything, actually.`,
          coach:`An attack in return — now she's defending herself instead of talking. One more move like that and it blows up.` },
        { icon:"💙", tag:"Empathy", cls:"good", dw:-18, dc:+15,
          text:`You didn't know for two hours what happened to me... Are you upset because this isn't the first time — I disappear and you wait?`,
          react:s=> s.wall>=60 ? `...Let's skip the psychology tricks for now. Eat, before it's completely dried out.` : `...I'm not upset. I don't even know what I am anymore. Eat, before it's completely dried out.`,
          coach:`Guessing at her feelings — even imperfectly — shows you're looking her way. The wall drops a little.` },
        { icon:"🔧", tag:"Quick fix", cls:"meh", dw:+5, dc:+3, fake:1,
          text:`Okay, okay, I'm here. Let's definitely go to Jemeluk tomorrow, I promise.`,
          react:()=>`You promised that last Friday too. "Definitely." I remember.`,
          coach:`A quick fix with no talk about feelings is a bandage on a wound you didn't even look at.` },
      ],
      next:"n2"
    },
    n2:{
      npc:s=> s.wall<50
        ? `It's not really about tonight. It's just... you disappear. The sea, courses, your projects, now this AI thing of yours. I'm alone in this paradise all day, every day. You know what that's like — being surrounded by paradise and feeling like furniture in it?`
        : `Never mind. It's fine. I'm used to being here alone with everything by now.`,
      options:[
        { icon:"🛡", tag:"Logic", cls:"bad", dw:+18, dc:0,
          text:`Vedmezhatko, come on, you knew what we were signing up for. We chose Amed together — it's either the sea or boredom here.`,
          react:()=>`"We" chose? You chose. I chose you. Those are different things.`,
          coach:`Logic always loses against feelings: what she hears is "your emotions are wrong."` },
        { icon:"💙", tag:"Empathy", cls:"good", dw:-20, dc:+25,
          text:`You're lonely. You want to feel like you're actually in my life — not somewhere after the sea and the projects, but right beside me. Is that it?`,
          react:s=> s.wall>=60 ? `...I don't know. Maybe. Does it even matter anymore.` : `...Yes. Exactly that. I'm not against your sea. I'm against feeling like I don't exist.`,
          coach:`You named her need out loud. When a person hears their need put into words, the defenses come down.` },
        { icon:"🗣", tag:"Honesty", cls:"good", dw:-8, dc:+15,
          text:`It's scary to hear that. I thought we were fine, and it hurts that you feel lonely here.`,
          react:()=>`So why do I have to make a scene for you to finally hear it?`,
          coach:`Honesty about yourself is good. But she still isn't heard yet: her feelings first, then yours.` },
        { icon:"🔧", tag:"Quick fix", cls:"meh", dw:+3, dc:+5, fake:1,
          text:`Yeah, got it. Let's make a schedule: three days I dive, four are ours.`,
          react:()=>`I don't want to be a slot in your schedule, understand? I want... never mind, forget it.`,
          coach:`A premature solution cut her off mid-sentence. The need was never actually said.` },
      ],
      next:"n3"
    },
    n3:{
      npc:()=>`Do you even still need this? All this — us? Or is it just convenient that someone's waiting at home with dinner?`,
      options:[
        { icon:"🗣", tag:"Honesty", cls:"good", dw:-10, dc:+25,
          text:`I need it. When I'm underwater — I'm happy, and the whole time I want to tell you about it. I need both the sea and you. Not instead of you. Together.`,
          react:s=> s.wall>=60 ? `Nice words. You always had a way with words.` : `...Together. Nice word. I'd almost forgotten how it sounds coming from you.`,
          coach:`Feeling plus need, with no defense and no blame. That's the honesty that brings people closer.` },
        { icon:"🛡", tag:"Defense", cls:"bad", dw:+15, dc:0, aggro:1,
          text:`What kind of question is that? If I didn't need it, I wouldn't be here. Logical, right?`,
          react:()=>`Logical. Everything's logical with you.`,
          coach:`She risked asking about feelings — and got logic instead. That's a wall too, just yours this time.` },
        { icon:"🔧", tag:"Self-sacrifice", cls:"meh", dw:+8, dc:0, fake:1,
          text:`If you want, I'll quit diving altogether. Just say the word.`,
          react:()=>`Don't you dare. I never asked for that. And don't turn me into the one who took the sea from you.`,
          coach:`Self-sacrifice isn't closeness. It's a bill you'll hand her later.` },
        { icon:"😅", tag:"Joke", cls:"bad", dw:+8, dc:-5,
          text:`Um... is this a test? Am I answering correctly?`,
          react:()=>`Everything's a joke to you.`,
          coach:`A joke at a moment of vulnerability is an escape. She risked opening up, and you dodged.` },
      ],
      next:"n4"
    },
    n4:{
      npc:()=>`So what do we do with this? Just don't say "everything will be fine," I'm begging you.`,
      options:[
        { icon:"✅", tag:"Clear request", cls:"good", dw:-5, dc:+20, endsRun:true,
          text:`Let's do two evenings a week — just ours: no sea, no laptop, no phones. And if I start disappearing again — tell me right away, don't carry it for a month. Deal?`,
          react:s=> s.contact>=60 ? `...Deal. And let's start right now — the tea's still warm. Sit down.` : `Deal. Let's see how long it lasts.`,
          coach:`A concrete, doable request — not a vague promise. This is the last step of NVC.` },
        { icon:"🌅", tag:"Concrete plan", cls:"good", dw:-5, dc:+20, endsRun:true,
          text:`Tomorrow at five — sunrise at Jemeluk. Just us, no phones. And from now on, Thursday is our evening. Every week. No exceptions.`,
          react:s=> s.contact>=60 ? `At five?.. You know I don't get up at five. ...Fine. But you're bringing the coffee.` : `Let's see if this plan survives until tomorrow.`,
          coach:`The request is concrete: time, place, action. Something you can actually do — and check.` },
        { icon:"🔧", tag:"Vague", cls:"meh", dw:0, dc:+3, fake:1, endsRun:true,
          text:`I'll just try to be around more. I promise to try.`,
          react:()=>`Okay. Try.`,
          coach:`"I'll try" is impossible to either do or check. It's not a request and not a plan.` },
        { icon:"🛡", tag:"Escape", cls:"bad", dw:+10, dc:0, endsRun:true,
          text:`Listen, can we finish this tomorrow? I'm not thinking straight after the sea.`,
          react:()=>`Sure. Tomorrow. Like always.`,
          coach:`The conversation reached the core — and you walked out of it. Tomorrow the wall will be higher.` },
      ],
      next:null
    }
  },
  endings:{
    wall:{ emoji:"🧊", title:"The Wall", cls:"bad",
      text:`Vedmezhatko silently takes the cup and goes inside. Click — the lock. You're left alone on the terrace with cold dinner and cicadas. The wall you built brick by brick through this whole conversation has closed from the inside. Tonight, no words will get through it.` },
    fight:{ emoji:"💥", title:"Fight", cls:"bad",
      text:`One word leads to another — and now you're shouting about something from three years ago. Nobody even mentions Jemeluk anymore. The neighbor's dogs join the debate. The night will be long, and the morning quiet and distant.` },
    truce:{ emoji:"🌫", title:"Truce", cls:"meh",
      text:`You've sort of made up. She said "okay," you exhaled. But nobody said the main thing: she's still lonely, and you still don't know how much. This is a truce, not peace. Next time it will tear open closer to the surface.` },
    contact:{ emoji:"🌅", title:"Contact", cls:"good",
      text:`The tea really is still warm. Vedmezhatko tells you what you two were like when you first arrived in Amed — and laughs for the first time all evening. You didn't "win the argument." You heard a person — and you were heard. That's what contact is.` },
  },
  debrief:`Four steps that lowered the wall: <b>observation</b> without judgment → <b>feelings</b> (hers and yours) → <b>need</b> spoken aloud → <b>a concrete request</b>.<br><br>And the main rule of the mechanic: when the Wall is high, a person physically cannot hear even the best words. Lower the wall with empathy first, then say your piece.`
});
