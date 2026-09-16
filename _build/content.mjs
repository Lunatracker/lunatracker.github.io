// Site content. The Learn articles and the Question Box are copied from the
// Luna app (apps/mobile/app/screens/Learn in the app repo); when the app's
// copy changes, update it here and rebuild with `node _build/build.mjs`.

export const APP_STORE =
  "https://apps.apple.com/us/app/luna-period-tracker-for-teens/id1607897488";
export const PLAY_STORE =
  "https://play.google.com/store/apps/details?id=com.evolutus.luna";
export const SITE = "https://lunatracker.app/";
export const CONTACT = "hello@lunatracker.app";

// The app's color tokens (apps/mobile/app/config/colors.ts).
export const colors = {
  primary: "#18bbbb",
  purple: "#5E60CE",
  pink: "#FF869E",
  green: "#36AE7C",
  blue: "#3AB0FF",
  orange: "#FF6347",
  pastelPink: "#ebbce2",
  pastelRed: "#f97c7c",
  pastelPurple: "#abb4e4",
};

const sources = {
  teenHealth: {
    url: "https://kidshealth.org/en/teens/menstruation.html",
    label: "TeenHealth",
  },
  firstPeriods: {
    url: "https://www.verywellhealth.com/answers-to-your-questions-about-first-periods-3520915",
    label: "Verywell Health",
  },
  spotting: {
    url: "https://www.orlandohealth.com/content-hub/spotting-vs-periods",
    label: "Orlando Health",
  },
  tampons: {
    url: "https://www.healthline.com/health/how-to-insert-a-tampon",
    label: "Healthline",
  },
  ovulation: {
    url: "https://www.healthline.com/health/womens-health/what-is-ovulation",
    label: "Healthline",
  },
  bloodColor: {
    url: "https://kidshealth.org/en/teens/blood-color.html",
    label: "TeenHealth",
  },
  puberty: {
    url: "https://kidshealth.org/en/teens/puberty.html",
    label: "TeenHealth",
  },
  femaleRepro: {
    url: "https://kidshealth.org/en/teens/female-repro.html",
    label: "TeenHealth",
  },
  lunar: {
    url: "https://pubmed.ncbi.nlm.nih.gov/23889481/",
    label: "Lunar cycle study",
  },
  pcos: {
    url: "https://www.livi.co.uk/your-health/severe-period-pain-endometriosis-or-pcos-how-can-you-tell-the-difference/",
    label: "Livi: severe period pain",
  },
  teenPregnancy: {
    url: "https://www.plannedparenthood.org/learn/teens/stds-birth-control-pregnancy/i-think-im-pregnant-now-what",
    label: "Planned Parenthood",
  },
  pubertyApp: {
    url: "https://apps.apple.com/us/app/all-about-you-the-puberty-app/id1571760327",
    label: "All About You: The Puberty App",
  },
};

/*
 * Learn articles, in the app's Learn tab order. `kind` picks an interactive
 * that the app has on that screen; plain articles have none.
 */
export const articles = [
  {
    slug: "normal-teen-periods",
    card: "Normal Teen Periods",
    title: "Normal Periods as a Teen (or Pre-teen)",
    blurb:
      "Why early periods are all over the place, what counts as normal, and when to check in with a doctor.",
    color: "pink",
    icon: "moonFirstQuarter",
    image: "images/learn/learn1.png",
    source: sources.teenHealth,
    sections: [
      {
        header: "Why are periods different when you first start?",
        text: "Periods and the menstrual cycle are controlled by hormones. At the beginning, your body is getting used to making them. Instead of the hormones coming regularly, they are all over the place. This can cause your period to be \"irregular,\" which means it isn't on a set schedule.",
      },
      {
        header: "So what is normal for early periods?",
        text: "After your first period, it may take a few months for the next one to come. One might last a couple days, and the next one a whole week. The next period could come in four weeks, but the one after that in three. After about 2 years, your period will settle into a regular schedule.",
      },
      {
        header: "How can I know when my period is coming if it isn't regular yet?",
        text: "You can pay attention to other changes in your body. Try to notice how your body feels before your period. You may get cramps, bloating, or breast pain as signs your period is coming.",
      },
      {
        header: "How do I know if I'm having problems with my period?",
        text: "Changes in exercise, travel, and stress can all cause changes to your period. You can always check in with a doctor if you are worried. There are some times you should talk to a doctor: if your period lasts longer than 7 days, or if your periods come less than 21 days or more than 45 days apart.\n\nYou should also talk to a doctor if you have severe cramps that don't get better, or if your period was regular and becomes irregular.",
      },
    ],
  },
  {
    slug: "period-supplies",
    card: "Period Supplies",
    title: "Period Supplies",
    blurb:
      "Pads, tampons, period underwear, liners and cups: what each one is and how to use it.",
    color: "purple",
    icon: "purse",
    image: "images/learn/supplies/pad.png",
    source: {
      url: "https://kidshealth.org/en/teens/supplies.html",
      label: "TeenHealth",
    },
    sections: [
      {
        header: "Pads",
        img: "images/learn/supplies/pad.png",
        text: "Pads are made of material that can absorb period blood. They go in the bottom of your underwear and catch the blood that comes out during your period. They have sticky material or wings that fold over the side of your underwear to keep them in place.\n\nTo use a pad, peel off the paper over the sticky strip and press it into the crotch of your underwear. You should change a pad about every 4 hours to stop bacteria from growing. Of course, you can change them more often if you need to so blood doesn't leak out. If it does leak a bit, don't worry, it happens to everyone at some point. Just put in a new pad. Throw the old pad in the trash, not down the toilet.\n\nPads are usually what people use first when they get their period, but adults use them too. There are many kinds of pads. A trusted adult can help you find the right one for you.",
      },
      {
        header: "Tampons",
        img: "images/learn/supplies/tampon.png",
        text: "Tampons are also made of material that absorbs period blood. They go inside the vagina. Tampons often come in a tube called an applicator, which is used to help put it in the vagina.\n\nTo put in a tampon, it helps to be relaxed. Use your fingers (or a mirror) to find the opening to your vagina. It may help to sit on the toilet or put one foot up on a seat. Open the tampon. The tampon may have a plastic applicator to help you guide it in. Gently push the tampon towards your lower back (not straight up towards your head). Push the tampon as far back as it will go. If it feels uncomfortable, just take a deep breath, take it out, and try again. If it has an applicator, push the top part in and then remove it. The tampon string should hang out of your vagina. You shouldn't feel the tampon at all.\n\nTo remove it, pull it out by the string and throw it in the trash, not the toilet. Never leave a tampon in more than eight hours (you can get an infection called toxic shock syndrome). Changing a tampon every 4–6 hours is a good idea. And you can change them as often as you need if you have a heavier flow, so blood doesn't leak into your underwear.",
      },
      {
        header: "Period Panties",
        img: "images/learn/supplies/panties.png",
        text: "Period panties are special underwear made to absorb period blood. They are worn just like regular underwear, but you usually need to change them every 12 hours and wash them specially.\n\nPeriod panties can also be a nice backup for other supplies. You can wear them with a pad or tampon if you are worried about leaking.",
      },
      {
        header: "Panty Liners",
        img: "images/learn/supplies/liner.png",
        text: "Panty liners are like pads for when you are not on your period. They are small and can catch vaginal discharge, or very light flow at the beginning or end of your period. They are not used on period days. For those you should use a pad.",
      },
      {
        header: "Menstrual Cup",
        img: "images/learn/supplies/cup.png",
        text: "Menstrual cups are designed to go in the vagina and catch blood. The blood then needs to be dumped in the toilet or sink a few times a day.\n\nSome people find cups difficult to use, so you may want to try one of the other supplies first.",
      },
      {
        header: "What if I stain my clothes?",
        text: "This happens to everyone with a period at some point, so even if you feel awkward about it, remember it's okay. You can wrap a sweater around your waist or keep a change of clothes in your backpack or locker. It's okay to ask to go home if you want to.",
      },
    ],
  },
  {
    slug: "handling-cramps",
    card: "Handling Cramps",
    title: "Top Tips for Handling Period Cramps",
    blurb:
      "What causes cramps, and five things that can make them feel better.",
    color: "green",
    icon: "lightningBolt",
    image: "images/learn/cramps/header.png",
    source: {
      url: "https://kidshealth.org/en/kids/period-cramps.html",
      label: "KidsHealth",
    },
    sections: [
      {
        text: "Period cramps are caused by the uterus squeezing. It squeezes together to help get the blood out during a period. This causes cramps that can be uncomfortable or painful.",
      },
      {
        header: "Use heat",
        img: "images/learn/cramps/heat.png",
        text: "A heating pad, hot water bottle, or wet towel heated up in the microwave can help. Just get it warm and put it over your shirt on your belly to help relieve the cramps.",
      },
      {
        header: "Medicine",
        img: "images/learn/cramps/medicine.png",
        text: "Pain relievers, like ibuprofen, can help. Just make sure to talk to an adult like a parent so you take the right amount. You can even take it the day before you know your period is coming.",
      },
      {
        header: "Exercise",
        img: "images/learn/cramps/exercise.png",
        text: "Exercise and physical activity can help make cramps feel better. Walk, run, play sports, or do whatever makes you feel good.",
      },
      {
        header: "Eat healthy",
        img: "images/learn/cramps/eat.png",
        text: "Getting the right food and staying hydrated keeps cramps from getting worse.",
      },
      {
        header: "Talk to a doctor",
        img: "images/learn/cramps/doctor.png",
        text: "If nothing helps, or if your cramps are stopping you from doing your normal activities, a doctor can help. A trusted adult like a parent can help you talk to your doctor.",
      },
    ],
  },
  {
    slug: "first-period",
    card: "Your First Period",
    title: "Your First Period",
    blurb:
      "Signs it's on the way, how to make a period kit, and what to do if it shows up when you're not ready.",
    color: "pastelPink",
    icon: "lightbulbOn",
    image: "images/learn/calendar.png",
    source: sources.teenHealth,
    sections: [
      {
        text: "Getting your first period can be exciting, but it can also make you a little nervous. You may feel happy about growing older, but scared about what it will be like. You'll probably feel a mix of emotions about getting your first period.",
      },
      {
        header: "When will I get my first period?",
        text: "Some signs your period is on its way are that your breasts have started to develop. Periods usually start about 2 years after breasts start growing. You may have developed pubic and underarm hair too. If you have had vaginal discharge, which is a liquid that comes out of the vagina, it means your period is about 6 months away.\n\nOn average, most people get their period around age 12, but it can happen anywhere from age 9–15. The exact time of your first period is hard to predict.",
      },
      {
        header: "What can I do to be ready?",
        text: "You can make yourself a period kit so you're all prepared. Put a pad and extra underwear in a pouch so you are ready when the time comes. You can keep it in your backpack, locker, or a drawer.\n\nOnce you make your kit, check in with your feelings about getting your first period. You may be excited or nervous. Either way, try not to think about it too much. Your period will come all on its own when it's ready.",
      },
      {
        header: "What will happen during my first period?",
        text: "One day you'll look in your underwear, and you'll notice some blood. It may look red like other blood but could also be brown. Both are normal. Your first period could be light and last just a couple days. You may not get your second period for a couple months after that. Don't worry, that's just your body getting used to them. For other people, their first period could be heavier and their periods could come regularly right away.",
      },
      {
        header: "What if I'm not ready when it comes?",
        text: "If you are somewhere without your kit, don't worry. You can ask a friend or adult for a pad. It may feel awkward to ask, but it happens to everyone at some point, and people are happy to share. In a pinch you can use toilet paper to absorb the blood.\n\nIt's a good idea to talk to a trusted adult like a parent about periods before your first one comes. That way you'll have someone to talk to when it does.",
      },
      {
        header: "I got my first period!",
        text: "Congrats! Feel free to celebrate. Have a fun day with your friends, parents, or siblings. Or just do something special for yourself!",
      },
    ],
  },
  {
    slug: "reproductive-system",
    card: "Reproductive System",
    title: "The Reproductive System",
    blurb:
      "An interactive diagram of the uterus, ovaries, fallopian tubes, cervix and vagina. Tap each part to see what it does.",
    color: "pastelRed",
    icon: "humanHandsdown",
    image: "images/learn/body/FRSdiagram.png",
    kind: "body",
    source: sources.femaleRepro,
    intro:
      "This is the internal (inside) female reproductive system. Tap on each part to see what it does.",
    // Layer boxes are in the diagram's own 721 × 596 pixel space, copied from
    // the app's InternalScreen.
    parts: [
      {
        id: "ft",
        name: "Fallopian tubes",
        img: "images/learn/body/FT.png",
        box: [0, 6.95, 721, 227.1],
        text: "The fallopian tubes are a passage from the ovary to the uterus. They are where egg and sperm meet and the egg is fertilized.",
      },
      {
        id: "ovaries",
        name: "Ovaries",
        img: "images/learn/body/ovaries.png",
        box: [60.7, 158.05, 598.4, 96.6],
        text: "The ovaries make eggs and hormones (like estrogen). One egg is released each menstrual cycle.",
      },
      {
        id: "uterus",
        name: "Uterus",
        img: "images/learn/body/uterus.png",
        box: [228.6, 81.35, 265.3, 326.6],
        text: "Each cycle, a lining builds up on the inside of the uterus. If the egg is fertilized, the baby develops here. Otherwise, the lining gets shed and leaves the body during the period.",
      },
      {
        id: "cervix",
        name: "Cervix",
        img: "images/learn/body/cervix.png",
        box: [312.4, 407, 99.2, 41.5],
        text: "The cervix is a gateway to the uterus. It makes a mucus that changes throughout the menstrual cycle. It can be creamy, sticky, or watery depending on where you are in your cycle.",
      },
      {
        id: "vagina",
        name: "Vagina",
        img: "images/learn/body/vagina.png",
        box: [304.1, 404.75, 112.5, 187.7],
        text: "The vagina is a passage for period flow and for a baby during birth. This is where sperm enter the body.",
      },
    ],
    sections: [],
  },
  {
    slug: "how-periods-work",
    card: "How Periods Work",
    title: "The Menstrual Cycle",
    blurb:
      "Step through a whole cycle: the period, the lining rebuilding, ovulation, and back again.",
    color: "pastelPurple",
    icon: "circleSlice8",
    image: "images/learn/cycle/ovulation.png",
    kind: "cycle",
    source: sources.teenHealth,
    sections: [
      {
        header: "Period",
        img: "images/learn/cycle/period.png",
        phase: "period",
        text: "The menstrual cycle is all the changes that happen about each month in the female reproductive system, starting at puberty. Everyone is different, and the times here are just an average. Even for one person, the times can be different from cycle to cycle.\n\nThe first step is the first day of the period, when blood leaves the uterus through the vagina. A period usually lasts 3–7 days.",
      },
      {
        header: "Lining rebuilds",
        img: "images/learn/cycle/follicular.png",
        phase: "lining1",
        text: "After the period is over, the lining in the uterus starts to rebuild. This lining is what will become the period blood. This is called the \"follicular phase\" and lasts another 7–10 days.",
      },
      {
        header: "Ovulation",
        img: "images/learn/cycle/ovulation.png",
        phase: "ovulation",
        text: "About two weeks after the last period started, the egg leaves the ovary and starts to travel to the uterus. The egg leaving the ovary is called ovulation. This is when the egg can be fertilized by sperm. If there is no sperm present, the egg will disintegrate after 1 day.",
      },
      {
        header: "Lining keeps building",
        img: "images/learn/cycle/luteal.png",
        phase: "lining2",
        text: "After ovulation, the uterus gets ready to receive the egg. The uterus, or womb, is where a fetus would grow into a baby, but only if the egg was fertilized by sperm. Just in case, the uterus lining becomes thick with nutrients. That is why period blood can be thicker sometimes.",
      },
      {
        header: "Next period starts",
        img: "images/learn/cycle/period.png",
        phase: "period",
        text: "If there is no pregnancy, the lining from the uterus is shed again. It leaves through the vagina, marking the next period. And the cycle repeats.",
      },
    ],
  },
  {
    slug: "hormones",
    card: "How Hormones Work",
    title: "How Do Hormones Work?",
    blurb:
      "Estrogen, progesterone, feelings, and what to say when someone says you're \"just PMSing.\"",
    color: "orange",
    icon: "hexagon",
    image: "images/learn/hormone.png",
    source: {
      url: "https://kidshealth.org/en/teens/endocrine.html",
      label: "TeenHealth",
    },
    sections: [
      {
        text: "Hormones are tiny chemical messengers. Their job is to send messages around the body. There are lots of different hormones sending lots of different messages, like telling your heart how fast to beat or your brain that it's time to eat. Hormones also tell your reproductive system when to start your period.",
      },
      {
        header: "How do hormones change during the menstrual cycle?",
        text: "Your cycle is controlled by two main hormones called estrogen and progesterone. Your body makes different amounts of them throughout the cycle. Estrogen and progesterone work together to send the messages of the cycle: start the period, release the egg, build the lining of the uterus.",
      },
      {
        header: "Do hormones make you act emotional or feel differently?",
        text: "Some people feel differently during different parts of their cycle. A lot of people think that periods and hormones make you feel a certain way. The reality is a bit more complex. Hormones allow us to have certain feelings and emotions. Higher amounts of hormones at different parts of the menstrual cycle may allow you to feel more intense emotions, like happiness, sadness, or anxiety.",
      },
      {
        header: "What do I do if I'm feeling hormonal?",
        text: "Remember that you can still shape your own feelings. Do something that helps you relax, like talking to a friend, exercising, or journaling.",
      },
      {
        header: "I got mad at someone and they told me I was just PMSing.",
        text: "That person was wrong and trying to put you down. PMS means premenstrual syndrome, and some people use it as a way to wrongly label females as irrational. Some people do feel differently before their period, but often those are physical symptoms from the hormone messages, not always emotional ones. It is never okay to insult someone just because they have a period.",
      },
      {
        header: "Will it always feel this way?",
        text: "Things can feel really overwhelming, especially at the start of periods and puberty. It takes the body time to learn how to make hormones correctly. Things do get more settled eventually. Always remember that you can talk to a trusted adult like a parent, school social worker, or doctor if you need help.",
      },
    ],
  },
];

/* Question Box, in the app's menu order. */
export const questionSections = [
  {
    id: "teen-periods",
    title: "Periods as a teen",
    color: "pink",
    icon: "moonFirstQuarter",
    items: [
      {
        q: "When will I get my first period?",
        a: "It's hard to know exactly when your first period will come. You'll see blood in your underwear, and that's how you know it started. Usually periods start when you're between 11–15, but they can be earlier or later. Periods usually start about 2 years after the first signs of breast development.",
        source: sources.teenHealth,
      },
      {
        q: "How often will I get my period?",
        a: "At the beginning, it might feel like your period comes at random times. After your first period, it may not come again for a while. Especially at the beginning, each cycle may be different and can be anywhere from 20–45 days apart. You may even skip periods. Later they will become more regular. Cycles get a bit shorter as you get older. Every 28 days is just the average (in fact, only around 15% of women actually have cycles exactly that long). \"Normal\" periods means normal for your body.",
        source: sources.teenHealth,
      },
      {
        q: "How long is each period?",
        a: "Everyone is different, but they are often anywhere from 2–7 days. They can be longer: normal means normal for your body.",
        source: sources.teenHealth,
      },
      {
        q: "Are periods always going to be like this?",
        a: "Your body takes a little time to get used to having periods. That means usually as you grow older, they will become more predictable. Some of the symptoms, like cramps, may even get better over time. So even if it seems really bad now, it gets better as you learn how to manage your periods. You've got this!",
        source: sources.teenHealth,
      },
    ],
  },
  {
    id: "how-periods-work",
    title: "How periods work",
    color: "purple",
    icon: "circleSlice8",
    items: [
      {
        q: "What is a period?",
        a: "Your period is when some blood comes out of your vagina. It happens every few weeks for a few days at a time, starting at puberty. It is a normal, healthy part of life.",
        source: sources.teenHealth,
      },
      {
        q: "What does the blood look like?",
        a: "Period blood can be red, pink, or brown. It may also be kind of thick.",
        source: sources.bloodColor,
      },
      {
        q: "Is there a lot of blood?",
        a: "Not as much as you might think! Usually just a few tablespoons (30–45 mL) over the whole period. It may help to know that the blood doesn't come out all at once, usually less than a teaspoon (3–5 mL) at a time. You may notice that a different amount of blood comes out each day. Every person is different, and some people have heavier period flows than others.",
        source: sources.teenHealth,
      },
      {
        q: "What is spotting?",
        a: "Sometimes a little blood will come out when it is not time for your period. This is called spotting, and it is totally normal. With spotting there is a lot less blood than during a period, not enough to need a pad or tampon. You might just notice a \"spot\" of bright blood in your underwear or on toilet paper.",
        source: sources.spotting,
      },
      {
        q: "Why do periods happen?",
        a: "The period blood is actually a lining that builds up in the uterus. The body makes the lining to prepare for having a baby. When there is no pregnancy, the lining is shed. It isn't dirty, and it isn't really a \"cleaning out.\" It's just extra lining you don't need.",
        source: sources.firstPeriods,
      },
      {
        q: "What is the difference between the menstrual cycle and the period?",
        a: "A period refers to the few days when blood leaves the body. The menstrual cycle refers to everything that happens in the reproductive system between two periods. It includes the period at the beginning, and ovulation (the egg leaving the ovary) about halfway through. The menstrual cycle is controlled by hormones.",
        source: sources.firstPeriods,
      },
    ],
  },
  {
    id: "self-care",
    title: "Self care",
    color: "green",
    icon: "heart",
    items: [
      {
        q: "What is a tampon? A pad? Period underwear?",
        a: "There are a lot of period products to stop the blood from getting on your clothes. Pads go in the underwear and catch the blood, and tampons go in the vagina and soak up the blood. Period underwear is made of special material that can absorb the blood.",
        source: sources.tampons,
      },
      {
        q: "How do I use pads and tampons?",
        a: "You put a period pad inside your underwear, and it usually has sticky strips to hold it in place.\n\nTo put in a tampon, it helps to be relaxed. Use your fingers (or a mirror) to find the opening to your vagina. It may help to sit on the toilet or put one foot up on a seat. Open the tampon. The tampon may have a plastic \"applicator\" to help you guide it in. Gently push the tampon towards your lower back (not straight up towards your head). Push the tampon as far back as it will go. If it feels uncomfortable, just take a deep breath, take it out, and try again. If it has an applicator, push the top part in and then remove it. The tampon string should hang out of your vagina. You shouldn't feel the tampon at all.\n\nTo remove it, pull it out by the string. Never leave a tampon in more than eight hours (you can get an infection called toxic shock syndrome). Changing a tampon every 4–6 hours is a good idea.",
        source: sources.tampons,
      },
      {
        q: "Are there any signs that I'm getting my period?",
        a: "Some people get symptoms (sometimes called PMS) like bloating or sore breasts before their period. As you start tracking your period, you can pay attention to your body to learn what is normal for you.",
        source: sources.teenHealth,
      },
      {
        q: "How do I handle period cramps?",
        a: "Putting a warm heating pad on your stomach or asking for medicine can help. Sometimes it helps to take medicine right when you first realize you are getting your period, before the cramps even start.",
        source: sources.teenHealth,
      },
      {
        q: "Do I have to get periods?",
        a: "In general, your period comes on its own. There are medicines that can stop periods from happening, which is something you can ask your doctor about.",
        source: sources.firstPeriods,
      },
      {
        q: "What if my cramps are really painful? Or my period is very heavy or irregular?",
        a: "It is normal to feel some pain during your period. It is also normal for periods to come early, late, or be skipped, especially at the beginning. Sometimes periods can be severely painful, very heavy, or the time between them can be very long. These are sometimes signs of health conditions called endometriosis and PCOS. If you are worried, talk to your doctor. They can help you find what is wrong and give you medicine. A trusted adult can help.",
        source: sources.pcos,
      },
    ],
  },
  {
    id: "talking-to-adults",
    title: "Talking to adults",
    color: "blue",
    icon: "chatQuestion",
    items: [
      {
        q: "I'm nervous to talk to my parents/guardians about my period.",
        a: "It's totally normal to feel nervous to talk about periods with your parents or other adults. But remember, they were kids once too! They are usually happy to help by chatting or getting supplies. Periods are a normal part of life. If you are still nervous, find another trusted adult to talk to, like a teacher or school nurse.",
      },
      {
        q: "How do I start a conversation with an adult?",
        a: "If you are unsure what to say, you can always send them a text or write a letter. Talking in the car or while walking is a good time too (no need for eye contact!). Of course, you can also just talk to them any time you want. Periods are normal, healthy, and nothing to be ashamed of.",
      },
    ],
  },
  {
    id: "puberty",
    title: "Puberty",
    color: "orange",
    icon: "star",
    items: [
      {
        q: "Is there an order to the changes of puberty in females?",
        a: "Everyone is different, but usually one of the first signs of puberty in females is a breast bud, a small lump behind the nipple that leads to the development of breasts. Then come vaginal discharge, pubic hair, and a growth spurt. Then periods begin. It is perfectly normal for these changes to happen \"out of order\" though. It can take a few years for all the changes to happen.",
        source: sources.puberty,
      },
      {
        q: "Is there an order to the changes of puberty in males?",
        a: "Everyone is different, but usually one of the first signs of puberty in males is the testicles growing and making sperm. Then come pubic hair, erections (the penis gets hard sometimes), and a growth spurt. It is perfectly normal for these changes to happen \"out of order\" though. All the changes take a few years to happen.",
        source: sources.puberty,
      },
      {
        q: "How will my breasts grow?",
        a: "The first sign your breasts are starting to grow is a small swelling or lump behind the nipple. This is called a \"breast bud.\" When your breasts start growing, they can be a bit sore or itchy. Your breasts may continue to grow into your late teens and early 20s.",
        source: sources.puberty,
      },
      {
        q: "Is it normal for my breasts to be different sizes?",
        a: "Yes, breasts can be different sizes, and can grow at different rates during puberty.",
        source: sources.puberty,
      },
      {
        q: "What is discharge? Sometimes there's a milky liquid in my underwear. Is that normal?",
        a: "Totally. The vagina makes a fluid to clean itself. Sometimes it ends up in your underwear. The fluid is called discharge, and it can be sticky. It can look different at different times of the menstrual cycle, from clear to a bit white or yellow. You can wear panty liners, which are like thin pads, to absorb discharge if you want to.",
        source: sources.puberty,
      },
      {
        q: "I want to learn more about puberty.",
        a: "Awesome! There's an app for that too. Check it out at the link below.",
        source: sources.pubertyApp,
      },
    ],
  },
  {
    id: "reproductive-system",
    title: "Reproductive system",
    color: "pastelRed",
    icon: "humanHandsdown",
    items: [
      {
        q: "Does the egg leave the body with the period?",
        a: "No. If there is no sperm present, the egg disintegrates after 24 hours. The egg leaves the ovary halfway through the cycle, at the opposite time from the period. The egg leaving the ovary is called ovulation.",
        source: sources.ovulation,
      },
      {
        q: "What is the womb?",
        a: "\"Womb\" is another name for the uterus. This is where the period lining (the blood) builds up. Usually the word womb is used when talking about where a baby develops during pregnancy.",
        source: sources.femaleRepro,
      },
      {
        q: "How many openings into the female body are there?",
        a: "There are three openings: the urethra (for pee), the vagina (for periods), and the anus (for poop).",
        source: sources.femaleRepro,
      },
      {
        q: "Can you feel it when the egg leaves the ovary?",
        a: "Some people can feel ovulation (the egg leaving the ovary), and some people cannot. You will figure out what is normal for your body.",
        source: sources.ovulation,
      },
    ],
  },
  {
    id: "pregnancy",
    title: "Pregnancy",
    color: "pastelPurple",
    icon: "handHeart",
    items: [
      {
        q: "How old does someone have to be to get pregnant?",
        a: "Technically, a woman can get pregnant once she starts having periods, and a man can start a pregnancy once he produces sperm (although it is rare in the first couple years of puberty). But just because you can have a baby doesn't mean you are ready! It is a big emotional and personal commitment.",
        source: sources.teenHealth,
      },
      {
        q: "Are there other ways to have a baby?",
        a: "People can have a baby without being pregnant by adopting a child. They can also use a surrogate, which is when one person offers to be pregnant with the baby and another person or people raise the baby as the baby's parents.",
        source: sources.teenHealth,
      },
      {
        q: "How does someone know if they are pregnant?",
        a: "When someone is pregnant they stop having periods. So missing a period is one sign of being pregnant. But missing a period can happen for a lot of reasons other than pregnancy. Missing periods is especially common as a teen. There are pregnancy tests that can show if someone is pregnant.",
        source: sources.firstPeriods,
      },
      {
        q: "I think I'm pregnant. Now what?",
        a: "\"Finding out you're pregnant can be scary, but try to stay calm. You're going to be okay, and there are people who can help you.\" You are not alone. Check out the link below for help.",
        source: sources.teenPregnancy,
      },
    ],
  },
  {
    id: "about-luna",
    title: "About Luna",
    color: "pastelPink",
    icon: "moonWaningCrescent",
    items: [
      {
        q: "Luna predicted my period dates wrong.",
        a: "That's totally normal! Your body does not work like a clock. Especially as a teen, your cycle and period can last different amounts of time from one cycle to the next. As you get older, they will become more regular. But it is good to start practicing tracking now.",
        source: sources.teenHealth,
      },
      {
        q: "Why is it called Luna? I thought the moon/period connection was a myth?",
        a: "It is a myth! We just liked the name. The fact that the menstrual cycle lasts about as long as a moon cycle (a month) is a coincidence. After all, people have all sorts of different cycle lengths, so how could they all be controlled by the moon?",
        source: sources.lunar,
      },
    ],
  },
];

/* Home page FAQ. Also emitted as FAQPage JSON-LD, so the two never drift. */
export const homeFaq = [
  {
    q: "Who is Luna for?",
    a: "Luna is made for teens, tweens, and anyone just starting their period. The predictions, the Learn section, and the Question Box are all written with young, still-settling cycles in mind.",
  },
  {
    q: "Does Luna have ads?",
    a: "No. Luna has no ads, ever, and your data is never sold.",
  },
  {
    q: "Can I keep Luna private?",
    a: "Yes. You can lock Luna with a passcode. If you link a parent or guardian, your notes are never shared with them.",
  },
  {
    q: "What does Luna+ add?",
    a: "Luna+ is Luna's subscription. It backs up your data so you can restore it on a new phone, and unlocks extras like photo backgrounds and calendar stickers. A parent's Luna+ can cover a linked child's backup.",
  },
  {
    q: "Is Luna on iPhone and Android?",
    a: "Yes. Luna is on the App Store for iPhone and iPad, and on Google Play for Android.",
  },
];
