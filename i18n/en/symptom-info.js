import links from './links'

export const generalInfo = {
  chartNfp: `On the chart, you can track fertility signs. When both a valid temperature shift and a mucus or cervix shift have been detected, an orange line will be displayed on the chart. This indicates the end of the peri-ovulatory and the beginning of the post-ovulatory phase.`,
  curiousNfp: `If you are curious to learn more about the sympto-thermal method that is used for fertility tracking within the app, you can visit ${links.wiki.url}.`,
  cycleRelation: `It may be influenced by or have an impact on your menstrual cycles and its hormonal changes.`,
  excludeExplainer: `You can exclude these values, so they won't be taken into account for any fertility calculation.`,
  nfpTfyReminder: `Drip makes period predictions for you and helps you apply NFP fertility awareness rules. But please remember that this app is made by humans, and humans make mistakes. Always think for yourself: "Does this make sense?" Remember, you don't need an app to understand your cycle! However, drip wants to support you and make period tracking easier, more transparent and secure.

Please find more info on the sympto-thermal method in ${links.wiki.url}.`,
  noNfpSymptom: `The app allows you to track this symptom for your information, it is not taken into account for any calculation. On the chart you can check how often you track this symptom.`
}

export default {
  bleeding: {
    title: `Tracking menstrual bleeding`,
    text: `Tracking menstrual bleeding allows you to know the beginning and the end of a menstrual cycle.

After tracking at least 3 menstrual cycles, drip will give you an overview of
· how long your cycles last on average (in "stats"),
· whether the length of your cycles varied significantly (in "stats" and in bleeding predictions)
· and predict your next 3 cycles with a range of 3 or 5 days (on home screen and "calendar").

The app allows you to track different intensities of bleeding. On the chart and on the calendar, bleeding values are colored in different shades of red. The darker, the more intense your bleeding. Every bleeding value that is not excluded is taken into account for fertility calculation and prediction for the start of next cycles.

Excluding bleeding values is for tracking bleeding when it's not marking the start of a new cycle or the continuation of menstrual bleeding the day(s) before, e.g. bleeding caused by ovulation or a miscarriage.

When - on a daily/regular basis - you track:
1. your basal body temperature,
2. your cervical mucus OR your cervix,
3. and menstrual bleeding
the app helps you identify in which phase of your cycle you are.

${generalInfo.nfpTfyReminder}`,
  },
  cervix:  {
    title: `Tracking your cervix`,
    text: `The cervix is located inside of the body at the end of the vaginal canal, between the vagina and the uterus.

Tracking how open or closed and how firm or soft the cervix feels can help determine in which phase of the menstrual cycle you are.

By default, the secondary symptom the app uses for NFP evaluation is cervical mucus, but you can change it to cervix in "Settings" -> "NFP Settings". When - on a daily/regular basis - you track:
1. your basal body temperature,
2. your cervical mucus OR your cervix,
3. and menstrual bleeding
the app helps you identify in which phase of your cycle you are.

· How to identify a fertile cervix?
A fertile cervix is open and feels soft like your earlobes. In contrast, an infertile cervix feels closed and hard, like the tip of your nose. If the cervix feels anything other than closed and hard, drip takes it as a sign of fertility. On the chart, a fertile cervix is colored in dark yellow, and infertile cervix is colored in light yellow.

${generalInfo.chartNfp}

${generalInfo.excludeExplainer}

${generalInfo.nfpTfyReminder}`
  },
  desire:  {
    title: 'Tracking sexual desire',
    text: `The app allows you to track sexual desire independently from sexual activity.

${generalInfo.cycleRelation}

${generalInfo.noNfpSymptom}

${generalInfo.curiousNfp}`
  },
  mood:  {
    title: 'Tracking mood',
    text: `The app allows you to track your mood.

${generalInfo.cycleRelation}

${generalInfo.noNfpSymptom}

${generalInfo.curiousNfp}`
  },
  mucus:  {
    title: 'Tracking cervical mucus',
    text: `Cervical mucus can help determine in which phase of the menstrual cycle you are.

By default the secondary symptom the app uses for NFP evaluation is cervical mucus. When - on a daily/regular basis - you track:
1. your basal body temperature,
2. your cervical mucus OR your cervix,
3. and menstrual bleeding
the app helps you identify in which phase of your cycle you are.

· How to identify fertile cervical mucus?
Tracking the feeling and the texture of your cervical mucus on a daily basis helps you identify changes of the quality of the cervical mucus. The values you enter for both feeling and texture of your cervical mucus are combined by drip into one of five NFP-conforming values.
From lowest to best quality:
· t = (dry feeling + no texture),
· ∅ = (no feeling + no texture),
· f = (wet feeling + no texture),
· S = (no OR wet feeling + creamy texture),
· S+ = (any feeling + egg white texture) OR (slippery feeling + any texture).

On the chart, mucus is colored in blue: the darker the shade of blue the better the quality of your mucus.

Please note that drip does not yet support "parenthesis values": According to NFP rules,  you can qualify a mucus value by putting parentheses around it, to indicate that it doesn't fully meet the descriptors of one of the five categories, and instead is in between. This functionality will be supported in the future.

${generalInfo.chartNfp}

${generalInfo.excludeExplainer}

${generalInfo.nfpTfyReminder}`
  },
  note:  {
    title: 'Notes',
    text: `Note allows you to track any extra information you want to save. It is the only category that can store information for a date in the future. This can be helpful for reminding you of an appointment.

${generalInfo.noNfpSymptom}

${generalInfo.curiousNfp}`
  },
  pain:  {
    title: 'Tracking pain',
    text: `The app allows you to keep track of different kinds of pain you experience.

${generalInfo.cycleRelation}

${generalInfo.noNfpSymptom}

${generalInfo.curiousNfp}`
  },
  sex:  {
    title: 'Tracking sex and contraceptives',
    text: `The app allows you to track sex independently from sexual desire. You can differentiate between masturbation and sex with a partner/partners. Here you can also track your contraceptive method(s). Only sexual activity will be shown in the "chart" section, lighter purple indicating solo sex and darker purple partner sex. Did you know that having an orgasm can help release cramps?

${generalInfo.noNfpSymptom}

${generalInfo.curiousNfp}`
  },
  temperature:  {
    title: 'Tracking body basal temperature',
    text: `One of the body signs you need to track for knowing your fertility status is your body basal temperature. The body temperature changes over the course of a menstrual cycle, it rises after ovulation.

By default the secondary symptom is cervical mucus, but you can change it to cervix in "Settings" -> "NFP Settings". When - on a daily/regular basis - you track:
1. your basal body temperature,
2. your cervical mucus OR your cervix,
3. and menstrual bleeding
the app helps you identify in which phase of your cycle you are.

· What is body basal temperature?
It's your temperature after lying still for at least 6 hours. For many, this is when they are waking up in the morning after sleeping at least 6 hours and before getting up.

· Which thermometer to use?
The thermometer must indicate 2 decimal places.

· How to measure?
You can measure rectally, vaginally or orally. If you chose rectal or vaginal measurement, you need to measure for at least 3 minutes. If you chose oral measurement, you should measure for at least 5 minutes. Pick one way and stick to it.

${generalInfo.chartNfp}

${generalInfo.excludeExplainer}

${generalInfo.nfpTfyReminder}`
  },
}
