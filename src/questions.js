export const ALL_QUESTIONS = [
  // ==========================================
  // ====== DROIT DES SÛRETÉS (DS) - EXAM =====
  // ==========================================
  {
    id: 1,
    cat: "sûretés",
    theme: "Introduction aux Sûretés",
    q: "Sous le principe d'égalité de l'article 2285 du Code civil, quelles sont les conséquences exactes de la règle du 'prix de la course' pour les créanciers chirographaires ?",
    multi: true,
    opts: [
      "Le premier créancier chirographaire qui saisit un bien du débiteur est payé en priorité sur le produit de la vente de ce bien, au détriment des autres créanciers",
      "Le principe d'égalité n'opère qu'à proportion de leurs créances si les saisies sont concomitantes, mais la course individuelle permet d'éviter le concours",
      "Le droit de gage général confère automatiquement aux créanciers saisissants un droit de préférence de nature réelle sur le bien saisi",
      "La règle du 'prix de la course' est suspendue de plein droit dès lors qu'un créancier privilégié ou hypothécaire intervient à la procédure"
    ],
    correct: [0, 1],
    expl: "Le droit de gage général (Art. 2284 et 2285 cciv) consacre l'égalité des créanciers chirographaires. Cependant, faute de droit de préférence, le premier qui saisit est le premier payé ('prix de la course'), rompant l'égalité de fait. Les sûretés viennent corriger cette fragilité en conférant un droit de préférence ou d'exclusivité.",
    ref: "Articles 2284 et 2285 du Code civil / Fiche p.1",
    diff: "hard"
  },
  {
    id: 2,
    cat: "sûretés",
    theme: "Introduction aux Sûretés",
    q: "Un Entrepreneur Individuel (EI), sous le régime post-réforme de 2022, souhaite souscrire un cautionnement. Quelle affirmation est juridiquement exacte au regard du principe de scission des patrimoines ?",
    multi: false,
    opts: [
      "L'EI peut se porter caution pour garantir une deete dont il est lui-même le débiteur principal, engageant ainsi alternativement son patrimoine personnel ou professionnel",
      "La séparation légale des patrimoines interdit de se porter caution pour une deete dont on est débiteur principal en voulant engager l'autre patrimoine : nul ne peut se garantir soi-même",
      "Le cautionnement consenti par l'EI au bénéfice de son activité professionnelle engage d'office, par dérogation, ses deux patrimoines sans formalité spéciale",
      "L'EI ne peut jamais, sous peine de nullité absolue, souscrire de cautionnement personnel au profit d'un tiers"
    ],
    correct: [1],
    expl: "Le régime post-2022 sépare de plein droit les patrimoines personnel et professionnel de l'EI. Toutefois, l'EI ne peut se porter caution pour une dette dont il est lui-même débiteur principal afin d'offrir son autre patrimoine en garantie, car une personne ne peut se garantir elle-même (il n'y a pas d'altérité, élément fondamental du cautionnement).",
    ref: "Réforme de l'EI 2022 / Fiche p.1",
    diff: "hard"
  },
  {
    id: 3,
    cat: "sûretés",
    theme: "Cautionnement - Caractéristiques",
    q: "Depuis l'entrée en vigueur de la réforme du 15 septembre 2021 (au 1er janvier 2022), quelle est l'étendue exacte des exceptions opposables par la caution au créancier sous l'article 2298 du Code civil ?",
    multi: false,
    opts: [
      "La caution ne peut opposer que les exceptions strictement inhérentes à la deete principale (nullité absolue, paiement, prescription), à l'exclusion de toute exception personnelle",
      "La caution peut désormais opposer toutes les exceptions, qu'elles soient inhérentes à la deete ou personnelles au débiteur, y compris le dol subi par le débiteur principal ou sa nullité relative",
      "La caution ne peut opposer aucune exception si elle est qualifiée de 'caution avertie' ou si elle a renoncé au bénéfice de discussion",
      "La caution ne peut opposer les exceptions personnelles du débiteur qu'avec l'autorisation expresse du juge de l'exécution"
    ],
    correct: [1],
    expl: "C'est une modification majeure de la réforme de 2021. L'article 2298 cciv dispose que la caution peut opposer toutes les exceptions appartenant au débiteur, qu'elles soient inhérentes à la deete ou personnelles à ce dernier (comme le dol subi par le débiteur principal ou la nullité relative du contrat de base), renforçant considérablement le caractère accessoire de la garantie.",
    ref: "Article 2298 du Code civil / Fiche p.2, p.6, p.7",
    diff: "hard"
  },
  {
    id: 4,
    cat: "sûretés",
    theme: "Cautionnement - Caractéristiques",
    q: "Quelles conditions de fond et de forme régissent l'invocation du bénéfice de discussion prévu à l'article 2305 du Code civil ?",
    multi: true,
    opts: [
      "Le bénéfice de discussion doit obligatoirement être invoqué par la caution dès les premières poursuites dirigées contre elle",
      "La caution doit indiquer au créancier les biens du débiteur principal susceptibles d'être saisis, situés dans le ressort de la cour d'appel et hors litige",
      "Le bénéfice de discussion s'applique de plein droit, même si le cautionnement est stipulé solidaire ou si la caution y a renoncé",
      "La caution doit avancer les deniers nécessaires à la réalisation de la discussion des biens du débiteur principal"
    ],
    correct: [0, 1, 3],
    expl: "Le bénéfice de discussion (Art. 2305 cciv) permet à la caution d'exiger que le créancier poursuive d'abord le débiteur. Pour cela, elle doit l'invoquer dès les premières poursuites, indiquer des biens saisissables du débiteur (non litigieux, hors hypothèques préalables, situés sur le territoire national), et avancer les frais de poursuite. Il disparaît si la caution est solidaire ou y a renoncé.",
    ref: "Article 2305 du Code civil / Fiche p.2",
    diff: "hard"
  },
  {
    id: 5,
    cat: "sûretés",
    theme: "Cautionnement - Formation",
    q: "Un cautionnement consenti par une personne physique ou morale présente un caractère commercial. Quelles sont les implications juridiques précises de cette qualification ?",
    multi: true,
    opts: [
      "La preuve de l'engagement de caution peut être rapportée par tous moyens, dérogeant à l'exigence d'un écrit à titre de preuve au-delà de 1500€",
      "Le litige relève de la compétence exclusive du Tribunal de commerce, même si la caution est une personne physique non commerçante",
      "Le cautionnement commercial est présumé solidaire en jurisprudence, dispensant le créancier de prouver une clause expresse de solidarité",
      "La caution commerciale bénéficie d'office d'un délai de prescription réduit à 2 ans d'après le Code de commerce"
    ],
    correct: [0, 2],
    expl: "Le cautionnement est commercial s'il est souscrit pour les besoins d'un commerce ou par un établissement de crédit (nature commerciale). Il entraîne : la liberté de la preuve (Art. 110-3 C. com) et une présomption de solidarité (jurisprudence constante). Attention : si la caution personne physique n'est pas commerçante, le tribunal de commerce n'a pas de compétence exclusive (compétence optionnelle ou civile possible pour protéger le non-commerçant).",
    ref: "Jurisprudence constante / Fiche p.2",
    diff: "hard"
  },
  {
    id: 6,
    cat: "sûretés",
    theme: "Cautionnement - Formation",
    q: "Sous l'empire de l'article 2219 du Code civil (issu de la réforme de 2021), quelles sont les conditions d'application et la sanction exacte du devoir de mise en garde du créancier professionnel ?",
    multi: false,
    opts: [
      "Il s'applique à tous les cautionnements; la sanction est la nullité relative du contrat pour dol par réticence d'information",
      "Il s'applique uniquement aux cautions non averties face à un établissement de crédit; la sanction est la responsabilité civile contractuelle",
      "Il concerne toute caution personne physique engagée envers un créancier professionnel; la sanction est la déchéance des droits du créancier à hauteur du préjudice subi par la caution",
      "Il s'applique uniquement si le prêt principal dépasse un montant de 150 000 euros; la sanction est la déchéance totale de la deete"
    ],
    correct: [2],
    expl: "La réforme de 2021 a codifié le devoir de mise en garde à l'article 2219 cciv. Il bénéficie désormais à toute caution personne physique (sans distinction d'avertie ou non) face à un créancier professionnel. En cas de manquement (crédit inadapté ou risque d'endettement excessif), la sanction n'est plus la responsabilité civile mais la déchéance du droit d'agir du créancier à concurrence du préjudice subi par la caution.",
    ref: "Article 2219 du Code civil / Fiche p.3",
    diff: "hard"
  },
  {
    id: 7,
    cat: "sûretés",
    theme: "Cautionnement - Formation",
    q: "Lorsqu'un cautionnement conclu par une personne physique avec un créancier professionnel est qualifié de 'manifestement disproportionné', quelle règle s'applique depuis 2022 ?",
    multi: false,
    opts: [
      "Le cautionnement est frappé d'une nullité absolue et d'ordre public d'après l'article 2300 du Code civil",
      "Le créancier professionnel perd l'intégralité de sa créance contre le débiteur principal et contre la caution",
      "Le cautionnement est maintenu mais son montant est judiciairement réduit à ce que la caution peut raisonnablement garantir au jour de l'appel",
      "Le cautionnement est réduit au montant que la caution peut raisonnablement garantir au jour de sa conclusion, sans possibilité d'invoquer la clause de retour à meilleure fortune"
    ],
    correct: [3],
    expl: "L'article 2300 cciv (réforme de 2021) a profondément modifié la sanction de la disproportion manifeste. Au lieu de la décharge totale de la caution (ancien droit de la consommation), le cautionnement disproportionné conclu par une PP avec un pro est désormais simplement réduit au montant que la caution pouvait raisonnablement garantir à la date de sa conclusion. De plus, la clause jurisprudentielle de 'retour à meilleure fortune' a disparu : on apprécie strictement au jour de la conclusion.",
    ref: "Article 2300 du Code civil / Fiche p.4, p.5",
    diff: "hard"
  },
  {
    id: 8,
    cat: "sûretés",
    theme: "Cautionnement - Formation",
    q: "Une société se porte caution. Quelle est la sanction d'un cautionnement qui dépasse l'objet social ou contredit l'intérêt social, selon la forme de la société ?",
    multi: true,
    opts: [
      "Dans une SARL ou société par actions, le dépassement de l'objet social par les dirigeants est inopposable aux tiers de bonne foi; la société reste engagée",
      "Dans une SCI ou société civile, le cautionnement contraire à l'intérêt social ou dépassant l'objet social est nul, car il peut compromettre l'existence même de la société",
      "Pour toute société (SARL, SA, SCI), le dépassement de l'objet social entraîne systématiquement la nullité absolue du contrat de cautionnement",
      "Dans les sociétés à responsabilité illimitée, la contrariété à l'intérêt social (Art. 1833 cciv) peut entraîner la nullité de l'engagement"
    ],
    correct: [0, 1, 3],
    expl: "Dans les SARL et sociétés par actions, les dirigeants engagent la société même pour les actes dépassant l'objet social (inopposabilité du dépassement aux tiers de bonne foi). En revanche, dans les sociétés civiles (SCI, etc.) et sociétés de personnes, le dépassement de l'objet social ou la contrariété à l'intérêt social (surtout s'il compromet l'existence de la société, ex: SCI hypothéquant son unique actif pour garantir un tiers sans contrepartie) entraîne la nullité absolue du cautionnement.",
    ref: "Article 1833 du Code civil / Droit des sociétés / Fiche p.3",
    diff: "hard"
  },
  {
    id: 9,
    cat: "sûretés",
    theme: "Cautionnement - Formation",
    q: "Un époux marié sous le régime légal de la communauté réduite aux acquêts souscrit seul, sans le consentement exprès de son conjoint, un cautionnement. Quels biens sont engagés d'après l'article 1415 du Code civil ?",
    multi: false,
    opts: [
      "Ses biens propres, ses revenus (salaires) ainsi que l'intégralité des biens communs du couple",
      "Uniquement ses biens propres et ses revenus personnels, les biens communs du couple (y compris les revenus du conjoint) étant préservés",
      "L'acte est entaché de nullité relative invocable par le conjoint non consentant dans un délai de 2 ans",
      "Seuls ses biens propres sont engagés; ses revenus (salaires) faisant partie de la communauté sont exclus des poursuites d'après l'article 1415"
    ],
    correct: [1],
    expl: "Selon l'article 1415 cciv, le cautionnement contracté par un seul époux sans le consentement exprès de l'autre n'engage que ses biens propres et ses revenus. Les biens communs de la communauté sont protégés et ne peuvent pas être saisis par le créancier, mais l'acte reste parfaitement valable (pas de nullité).",
    ref: "Article 1415 du Code civil / Fiche p.3",
    diff: "hard"
  },
  {
    id: 10,
    cat: "sûretés",
    theme: "Cautionnement - Formation",
    q: "Deux époux mariés sous le régime de la communauté légale interviennent à une opération de garantie. Dans quelles configurations les biens communs et les biens propres de chacun sont-ils engagés ? (Sélectionner 2 réponses)",
    multi: true,
    opts: [
      "Si un époux se porte caution avec le consentement exprès de l'autre, seuls les biens propres de l'époux caution et les biens communs sont engagés (les biens propres du conjoint sont exclus)",
      "Si les deux époux signent le même acte de cautionnement conjointement, les biens propres des deux époux ainsi que la masse commune sont engagés",
      "Si les deux époux signent deux cautionnements par actes distincts sans autorisation mutuelle, la communauté est engagée pour le tout",
      "Si le couple est marié sous le régime de la séparation de biens, l'article 1415 s'applique et exige le consentement du conjoint pour engager ses propres revenus"
    ],
    correct: [0, 1],
    expl: "Sous le régime de communauté : 1) Si un époux cautionne avec consentement de l'autre, on engage ses propres + la communauté (mais pas les propres du conjoint non-caution). 2) Si les deux signent le même acte, les propres de chacun et la communauté sont engagés. 3) S'ils signent deux actes distincts sans autorisation mutuelle, seuls les propres et revenus de chacun sont engagés (la communauté reste exclue). 4) En séparation de biens, l'article 1415 ne s'applique pas car il n'y a pas de masse commune.",
    ref: "Article 1415 du Code civil / Fiche p.3",
    diff: "hard"
  },
  {
    id: 11,
    cat: "sûretés",
    theme: "Cautionnement - Formation",
    q: "Quelle règle de validité formelle l'article 2297 du Code civil impose-t-il au cautionnement souscrit par une personne physique envers un créancier professionnel depuis le 1er janvier 2022 ?",
    multi: false,
    opts: [
      "La caution doit rédiger de sa main une mention manuscrite calquée au mot près sur la formule légale, sous peine de nullité absolue",
      "La caution doit apposer une mention écrite précisant le montant garanti en chiffres et en lettres, mais cette mention n'a plus besoin d'être manuscrite et peut être électronique",
      "L'acte doit obligatoirement être notarié dès lors que le montant garanti excède 1500 euros, d'après l'article 1359 du Code civil",
      "La mention peut être rédigée par le créancier lui-même, la caution se contentant de signer électroniquement l'acte de garantie"
    ],
    correct: [1],
    expl: "Depuis le 1er janvier 2022, l'article 2297 cciv simplifie le formalisme : la caution personne physique doit apposer une mention écrite spécifiant le montant maximal garanti (en chiffres et en lettres). Cependant, le caractère impérativement 'manuscrit' est supprimé, permettant l'usage de la signature électronique (en respectant les articles 1174 et 1175 du Code civil). Il n'y a plus de formule légale sacramentelle obligatoire au mot près, mais la nullité reste la sanction en cas de défaut de mention.",
    ref: "Article 2297 du Code civil / Fiche p.2, p.5",
    diff: "hard"
  },
  {
    id: 12,
    cat: "sûretés",
    theme: "Cautionnement - Étendue",
    q: "Dans un cautionnement de deetes futures, quelle est la distinction fondamentale entre l'obligation de couverture et l'obligation de règlement ?",
    multi: false,
    opts: [
      "L'obligation de couverture impose de payer immédiatement la deete présente, tandis que l'obligation de règlement garantit le découvert futur",
      "L'obligation de couverture détermine les deetes futures qui entreront dans le champ de la garantie, tandis que l'obligation de règlement est l'obligation de payer les deetes nées durant la couverture à leur échéance",
      "L'obligation de couverture s'éteint rétroactivement en cas de décès de la caution, libérant ses héritiers de l'obligation de règlement",
      "La distinction n'a d'intérêt pratique que si le cautionnement est à durée déterminée et inférieur à 1500 euros"
    ],
    correct: [1],
    expl: "L'obligation de couverture fixe le cadre temporel et matériel durant lequel les dettes futures du débiteur intègrent le périmètre de la garantie. L'obligation de règlement est l'obligation de payer ces dettes nées pendant la phase de couverture lorsqu'elles deviennent exigibles. C'est l'intérêt majeur de la distinction lors de la résiliation ou du décès de la caution.",
    ref: "Articles 2316 et 2318 du Code civil / Fiche p.4, p.7",
    diff: "hard"
  },
  {
    id: 13,
    cat: "sûretés",
    theme: "Cautionnement - Étendue",
    q: "Quelles sont les caractéristiques et les limites du cautionnement défini par rapport au cautionnement indéfini d'après l'article 2296 du Code civil ?",
    multi: true,
    opts: [
      "Le cautionnement défini ou limité couvre uniquement le capital principal de la deete ou un montant maximum expressément déterminé",
      "Le cautionnement indéfini garantit d'office le capital, les intérêts, les frais de poursuite ainsi que toutes les indemnités contractuelles",
      "Le cautionnement défini peut valablement dépasser le montant de l'obligation principale si le créancier prouve la mauvaise foi de la caution",
      "Dans le cautionnement défini, la caution n'est pas tenue des intérêts de retard de la dette principale sauf clause contraire expresse"
    ],
    correct: [0, 1, 3],
    expl: "Le cautionnement indéfini (Art. 2292 et 2296 cciv) s'aligne sur l'obligation du débiteur principal et s'étend accessoires inclus (intérêts, pénalités, frais de poursuite). Le cautionnement défini limite la garantie à une somme ou au seul capital principal (Art. 2296), excluant d'office les intérêts de retard sauf clause contraire. En aucun cas le cautionnement ne peut excéder la deete principale sous peine de réduction.",
    ref: "Articles 2292 et 2296 du Code civil / Fiche p.4",
    diff: "hard"
  },
  {
    id: 14,
    cat: "sûretés",
    theme: "Cautionnement - Effets",
    q: "Quelle est la sanction exacte encourue par le créancier professionnel s'il manque à son obligation d'information annuelle de la caution personne physique sous l'article 2302 du Code civil ?",
    multi: false,
    opts: [
      "La déchéance totale du droit de poursuivre la caution pour l'exécution du contrat de garantie",
      "La nullité absolue du contrat de cautionnement par voie de caducité",
      "La déchéance du droit aux intérêts et pénalités de retard échus depuis la précédente information jusqu'à la date de la nouvelle notification",
      "L'obligation pour le créancier de restituer 50% des paiements déjà effectués par le débiteur principal"
    ],
    correct: [2],
    expl: "L'article 2302 cciv impose au créancier professionnel d'informer annuellement la caution personne physique (et parfois morale si le créancier est une banque) du montant du capital restant dû, des intérêts, frais et de la durée. La sanction de ce défaut d'information est la déchéance du droit aux intérêts et pénalités de retard contractuels échus depuis la précédente information jusqu'à la fourniture de la nouvelle information.",
    ref: "Article 2302 du Code civil / Fiche p.5",
    diff: "hard"
  },
  {
    id: 15,
    cat: "sûretés",
    theme: "Cautionnement - Effets",
    q: "Un créancier professionnel omet d'informer la caution personne physique du premier incident de paiement non régularisé du débiteur principal (Art. 2303 du Code civil). Quelle est la conséquence juridique ?",
    multi: false,
    opts: [
      "La caution est libérée de plein droit de toute obligation de règlement pour l'intégralité de la deete",
      "Le créancier encourt la déchéance des intérêts et pénalités de retard échus entre le premier incident de paiement et la date à laquelle la caution en a été informée",
      "Le débiteur principal est déchu du terme et le créancier doit poursuivre la caution immédiatement sans mise en demeure",
      "L'incident de paiement est considéré comme non avenu, suspendant la deete de plein droit"
    ],
    correct: [1],
    expl: "L'article 2303 cciv oblige le créancier professionnel à informer la caution personne physique de tout incident de paiement non régularisé dans le mois de son exigibilité, dès le premier incident. En cas de manquement, le créancier is déchu des intérêts et pénalités de retard échus entre ce premier incident et la date de l'information effective de la caution.",
    ref: "Article 2303 du Code civil / Fiche p.5",
    diff: "hard"
  },
  {
    id: 16,
    cat: "sûretés",
    theme: "Cautionnement - Recours & Extinction",
    q: "Une caution a désintéressé le créancier et exerce ses recours contre le débiteur principal. Quelles différences majeures distinguent son recours personnel (Art. 2308) et son recours subrogatoire (Art. 2309) ?",
    multi: true,
    opts: [
      "Le recours personnel crée un droit propre et nouveau pour la caution, empêchant le débiteur de lui opposer les exceptions qu'il pouvait opposer au créancier",
      "Le recours subrogatoire transmet à la caution la créance d'origine avec ses sûretés et privilèges, mais le débiteur peut lui opposer toutes les exceptions qu'il avait contre le créancier",
      "Le recours subrogatoire is toujours plus protecteur car il exclut d'office l'application des délais de prescription de la créance d'origine",
      "Le recours personnel permet à la caution de réclamer le principal, les intérêts, les frais de poursuite ainsi que des dommages et intérêts pour son propre préjudice"
    ],
    correct: [0, 1, 3],
    expl: "Le recours personnel (Art. 2308 cciv) is fondé sur un droit propre né du paiement : le débiteur ne peut opposer les exceptions issues de ses rapports avec le créancier, et la caution peut demander capital, intérêts, frais et DI. Le recours subrogatoire (Art. 2309 / 1346 cciv) transmet la créance avec ses garanties d'origine, mais le débiteur peut opposer toutes les exceptions opposables au créancier initial. L'inconvénient du subrogatoire is précisément cette opposabilité des exceptions.",
    ref: "Articles 2308 et 2309 du Code civil / Fiche p.6",
    diff: "hard"
  },
  {
    id: 17,
    cat: "sûretés",
    theme: "Cautionnement - Recours & Extinction",
    q: "Dans le cadre de cofidéjusseurs (plusieurs cautions garantissant une même deete), quels sont les droits et recours d'une caution qui a payé l'intégralité de la deete (caution solvens) ?",
    multi: false,
    opts: [
      "La caution solvens dispose d'un recours subrogatoire exclusif contre le débiteur principal, mais n'a aucun recours contre ses cofidéjusseurs",
      "La caution solvens dispose d'un recours personnel (Art. 2308) and subrogatoire (Art. 2312) lui permettant de réclamer à chaque cofidéjusseur sa part et portion de la deete, la part de l'insolvable étant répartie entre les autres",
      "La caution solvens peut réclamer l'intégralité de la somme payée à n'importe quel cofidéjusseur, la solidarité active s'appliquant de plein droit entre cautions",
      "L'extinction de la deete principale libère tous les cofidéjusseurs, interdisant tout recours réciproque"
    ],
    correct: [1],
    expl: "Selon l'article 2312 cciv, si une caution paye le tout (caution solvens), elle a un recours contre le débiteur principal et un recours contre les autres cautions, chacun pour sa part et portion. Si l'un des cofidéjusseurs is insolvable, sa part is répartie proportionnellement entre les autres cautions solvables et celle qui a fait le paiement.",
    ref: "Articles 2306 et 2312 du Code civil / Fiche p.2, p.6",
    diff: "hard"
  },
  {
    id: 18,
    cat: "sûretés",
    theme: "Cautionnement - Recours & Extinction",
    q: "Comment s'opère l'extinction du cautionnement par la voie accessoire en présence d'une remise de deete ou d'une remise de poursuite du créancier (Art. 1350 et 1350-2 du Code civil) ?",
    multi: true,
    opts: [
      "La remise de deete accordée au débiteur principal libère intégralement la caution de son engagement (Art. 1350-2)",
      "La simple remise de poursuite accordée par le créancier au débiteur principal libère la caution de plein droit",
      "La remise de deete accordée à l'un des cofidéjusseurs solidaires libère les autres cautions pour la part de celui-ci",
      "La remise de poursuite accordée au débiteur principal ne libère pas la deete; le créancier peut encore poursuivre la caution, ce qui déroge à l'accessoirité"
    ],
    correct: [0, 2, 3],
    expl: "L'article 1350-2 cciv dispose que la remise de deete accordée au débiteur libère la caution (car la deete s'éteint, voie accessoire). Par contre, la remise de poursuite (le créancier s'engage simplement à ne pas poursuivre le débiteur pour le moment) ne libère pas le débiteur ni la caution, le créancier pouvant poursuivre directement cette dernière. De même, la remise de deete consentie à un cofidéjusseur libère les autres à hauteur de sa part.",
    ref: "Articles 1350 et 1350-2 du Code civil / Fiche p.7",
    diff: "hard"
  },
  {
    id: 19,
    cat: "sûretés",
    theme: "Cautionnement - Recours & Extinction",
    q: "Quelle est l'incidence exacte de l'ouverture d'une procédure collective (sauvegarde, redressement, liquidation) du débiteur professionnel sur les poursuites contre la caution personne physique ?",
    multi: false,
    opts: [
      "Les poursuites sont suspendues dans toutes les procédures collectives (sauvegarde, RJ, LJ) sans distinction",
      "Les poursuites sont suspendues de plein droit pour la caution PP en sauvegarde et redressement judiciaire si la créance is déclarée, mais reprennent de plein droit en liquidation judiciaire (LJ)",
      "L'absence de déclaration de la créance dans les délais de la procédure collective éteint définitivement la deete principale, libérant d'office toutes les cautions",
      "La caution PP bénéficie systématiquement de toutes les remises et délais imposés par le plan de sauvegarde ou de redressement"
    ],
    correct: [1],
    expl: "En matière de procédures collectives : pour les cautions PP (personnes physiques), l'ouverture d'une procédure de sauvegarde ou de redressement judiciaire suspend les poursuites individuelles du créancier (si créance déclarée). En revanche, en cas de Liquidation Judiciaire (LJ), cette protection cesse et le créancier peut poursuivre immédiatement la caution PP. Si la créance n'est pas déclarée dans les délais, elle is inopposable aux cautions PP en sauvegarde/RJ mais reste opposable en LJ (depuis 2021). De plus, les réductions du plan ne profitent pas à la caution (Art. 2298).",
    ref: "Régime des procédures collectives / Fiche p.5, p.7",
    diff: "hard"
  },
  {
    id: 20,
    cat: "sûretés",
    theme: "Cautionnement - Recours & Extinction",
    q: "Pour que la caution soit déchargée de son obligation sur le fondement de l'exception de subrogation (bénéfice de cession d'actions de l'article 2314 du Code civil), quelles conditions cumulatives doivent être réunies ?",
    multi: true,
    opts: [
      "La perte d'un droit préférentiel ou d'une sûreté utile (gage, hypothèque, privilège) par le fait exclusif du créancier",
      "Une faute caractérisée (négligence ou acte positif) commise par le créancier dans la conservation ou l'inscription de son droit",
      "L'existence d'un préjudice subi par la caution, qui se traduit par l'impossibilité d'exercer utilement son recours subrogatoire",
      "Un montant de deete garanti supérieur à l'actif disponible du débiteur principal au jour de la signature"
    ],
    correct: [0, 1, 2],
    expl: "Le bénéfice de subrogation ou exception de subrogation (Art. 2314 cciv) exige 3 conditions cumulatives : 1) La perte d'un droit préférentiel ou d'une sûreté (qui devait garantir le recours de la caution). 2) Une faute du créancier (omission d'inscription, mainlevée volontaire, etc.). 3) Un préjudice pour la caution (privée d'une garantie utile pour se faire rembourser). La caution is alors déchargée à hauteur du préjudice subi.",
    ref: "Article 2314 du Code civil / Fiche p.7",
    diff: "hard"
  },
  {
    id: 21,
    cat: "sûretés",
    theme: "Cautionnement - Recours & Extinction",
    q: "Au décès de la caution personne physique (Art. 2317 du Code civil), quelles obligations sont transmises à ses héritiers ?",
    multi: false,
    opts: [
      "Les héritiers sont libérés de plein droit de toute obligation présente et future par effet rétroactif",
      "Les obligations de couverture (dettes futures) et de règlement (dettes déjà nées) sont intégralement transmises aux héritiers de manière indéfinie",
      "Seule l'obligation de règlement (dettes nées avant le décès) is transmise aux héritiers; l'obligation de couverture cesse de plein droit au jour du décès",
      "Les héritiers ne sont tenus que si l'acte comporte une clause de transmission notariale expresse visée par l'article 786"
    ],
    correct: [2],
    expl: "L'article 2317 cciv dispose qu'au décès de la caution personne physique, ses héritiers ne sont tenus que des dettes nées avant le décès (transmission de l'obligation de règlement). L'obligation de couverture (for dettes futures) prend fin de plein droit au jour du décès, les héritiers ne garantissant pas les nouvelles dettes souscrites par le débiteur après cette date.",
    ref: "Article 2317 du Code civil / Fiche p.7",
    diff: "hard"
  },
  {
    id: 22,
    cat: "sûretés",
    theme: "Garantie Autonome",
    q: "Au regard de l'article 2321 du Code civil, quel est le régime juridique de l'indépendance de la Garantie Autonome (GA) ?",
    multi: true,
    opts: [
      "Le garant ne peut opposer aucune exception tirée de l'obligation principale (inexécution, nullité, force majeure, etc.)",
      "La garantie is une obligation autonome qui ne se transmet pas de plein droit avec la créance d'origine du bénéficiaire",
      "La garantie autonome is interdite dans les crédits de consommation, de crédit immobilier relevant du droit de la conso, ou dans les baux d'habitation",
      "Le garant peut valablement invoquer la disproportion manifeste de la dette de base pour réduire son obligation d'appel"
    ],
    correct: [0, 1, 2],
    expl: "La Garantie Autonome (Art. 2321 cciv) se caractérise par une déconnexion complète du contrat de base : inopposabilité absolue des exceptions (sauf fraude ou abus manifeste). Elle is attachée personnellement au bénéficiaire et ne se transmet pas automatiquement avec la créance d'origine (absence d'accessoirité). Pour protéger les particuliers, la loi l'interdit dans les baux d'habitation et crédits à la consommation ou immobiliers relevant du droit de la consommation.",
    ref: "Article 2321 du Code civil / Fiche p.8, p.9",
    diff: "hard"
  },
  {
    id: 23,
    cat: "sûretés",
    theme: "Garantie Autonome",
    q: "Dans quelles circonstances précises le garant d'une Garantie Autonome (GA) ou le donneur d'ordre peuvent-ils s'opposer au paiement de l'appel en garantie ?",
    multi: true,
    opts: [
      "Si les conditions contractuelles formelles stipulées dans la lettre de garantie ne sont pas respectées par le bénéficiaire lors de l'appel",
      "En cas d'appel manifestement abusif ou frauduleux, caractérisé par la mauvaise foi incontestable du créancier ou une fraude évidente",
      "Dès lors que le débiteur principal prouve qu'il a déjà exécuté 50% des prestations prévues dans le contrat de base",
      "Si la caution apporte la preuve que la deete principale is frappée de prescription extinctive of droit commun"
    ],
    correct: [0, 1],
    expl: "L'inopposabilité des exceptions dans la GA ne connaît que 2 limites strictes : 1) Le non-respect des conditions contractuelles de la lettre de garantie (ex: absence de présentation de documents requis). 2) L'appel manifestement abusif ou frauduleux (qui requiert la mauvaise foi caractérisée ou la fraude flagrante et incontestable du créancier). Hors ces cas, le garant a l'obligation de payer et ne peut invoquer la prescription ou l'exécution partielle.",
    ref: "Article 2321 du Code civil / Fiche p.9",
    diff: "hard"
  },
  {
    id: 24,
    cat: "sûretés",
    theme: "Garantie Autonome",
    q: "Après avoir payé le bénéficiaire, quels sont les recours ouverts au garant d'une Garantie Autonome, et quel écueil comporte le recours subrogatoire ?",
    multi: false,
    opts: [
      "Le garant n'a aucun recours contre le donneur d'ordre, car la garantie is consentie à titre gratuit par nature",
      "Le garant dispose d'un recours personnel contractuel ou d'un recours subrogatoire (Art. 1346). Toutefois, le recours subrogatoire l'expose à toutes les exceptions que le donneur d'ordre pouvait opposer au créancier bénéficiaire",
      "Le recours subrogatoire lui confère une immunité totale, interdisant au donneur d'ordre d'opposer la moindre exception",
      "Le garant ne peut agir que devant le tribunal administratif pour obtenir indemnisation de l'État"
    ],
    correct: [1],
    expl: "Le garant dispose d'un recours personnel contre le donneur d'ordre (le débiteur), idéalement prévu au contrat. Il peut aussi exercer le recours subrogatoire de l'article 1346 cciv en récupérant les droits du créancier, mais l'inconvénient majeur de la subrogation is que le donneur d'ordre pourra lui opposer toutes les exceptions qu'il avait contre le créancier d'origine (ce qui fragilise le remboursement du garant).",
    ref: "Article 1346 du Code civil / Fiche p.9",
    diff: "hard"
  },
  {
    id: 25,
    cat: "sûretés",
    theme: "Lettre d'intention",
    q: "Dans une leetre d'intention régie par l'article 2322 du Code civil, comment s'apprécie l'existence d'une obligation de moyens ou de résultat, et comment s'établit la preuve de son inexécution ?",
    multi: true,
    opts: [
      "L'engagement de 'faire tout son possible' ou de 'veiller' à la solvabilité du débiteur is qualifié d'obligation de moyens; le créancier doit prouver la négligence du confortant",
      "L'engagement de 'faire le nécessaire' pour que le débiteur honore ses engagements is qualifié d'obligation de résultat; le seul défaut de paiement du débiteur établissant le manquement",
      "La leetre d'intention ne requiert aucun formalisme de validité (pas de mention manuscrite de l'article 1376 cciv) car elle n'est pas une obligation de payer la deete d'autrui",
      "L'indemnisation obtenue pour manquement à une obligation de résultat is légalement plafonnée à 50% du montant de l'obligation principale"
    ],
    correct: [0, 1, 2],
    expl: "L'article 2322 cciv régit la lettre d'intention (engagement de soutien, souvent société mère pour sa filiale). La jurisprudence distingue selon la rédaction : 'veiller à' ou 'faire de son mieux' is de moyens (charge de la preuve au créancier) ; 'faire le nécessaire' ou 's'engager à ce que' is de résultat (le non-paiement suffit à engager la responsabilité civile contractuelle). Aucun formalisme d'écriture manuscrite n'est exigé car le confortant s'engage à faire ou ne pas faire, et non à payer directement la deete d'un tiers.",
    ref: "Article 2322 du Code civil / Fiche p.10",
    diff: "hard"
  },
  {
    id: 26,
    cat: "sûretés",
    theme: "Sûretés réelles - Exclusives",
    q: "Dans le cadre de la Clause de Réserve de Propriété (CRP - Art. 2367 du Code civil), qu'advient-il de la sûreté si le débiteur revend le bien grevé à un sous-acquéreur ?",
    multi: true,
    opts: [
      "Si le sous-acquéreur is de bonne foi, il conserve la propriété du bien en vertu de l'article 2276 du Code civil ('en fait de meubles, possession vaut titre')",
      "Le créancier initial peut reporter sa sûreté de plein droit sur la créance de prix de revente encore due par le sous-acquéreur au débiteur (Art. 2372)",
      "Le créancier initial peut exiger la restitution physique immédiate du bien auprès du sous-acquéreur, même si ce dernier is de bonne foi",
      "Si le sous-acquéreur is de mauvaise foi (au courant de la réserve de propriété), il is tenu de restituer le bien au vendeur initial"
    ],
    correct: [0, 1, 3],
    expl: "En cas de revente d'un bien sous CRP à un tiers : 1) Si le tiers is de bonne foi, l'article 2276 cciv fait obstacle à la revendication physique (il garde le bien). 2) Le vendeur d'origine bénéficie alors d'une subrogation réelle sur le prix de revente : il peut appréhender la créance de prix encore due par le sous-acquéreur au débiteur (Art. 2372). 3) Si le tiers is de mauvaise foi, il doit restituer le bien.",
    ref: "Articles 2276, 2367 et 2372 du Code civil / Fiche p.11",
    diff: "hard"
  },
  {
    id: 27,
    cat: "sûretés",
    theme: "Sûretés réelles - Exclusives",
    q: "Quelles sont les conditions de validité, de fonctionnement et de protection de la fiducie-sûreté (Art. 2011 et 2372-1 du Code civil) ?",
    multi: false,
    opts: [
      "C'est un contrat consensuel non écrit; le bien reste dans le patrimoine saisissable du débiteur",
      "Le contrat doit être rédigé par écrit à peine de nullité, et enregistré sous peine de nullité. Le bien sort du patrimoine du débiteur pour intégrer un patrimoine d'affectation étanche, insaisissable par ses autres créanciers",
      "La fiducie-sûreté is limitée à une durée maximale de 10 ans et requiert obligatoirement un acte authentique notarié dans tous les cas",
      "En cas de défaut de paiement, le créancier s'approprie le bien d'office sans expertise préalable et conserve l'intégralité de sa valeur"
    ],
    correct: [1],
    expl: "La fiducie-sûreté (Art. 2011 et 2372-1 cciv) exige un contrat écrit à peine de nullité, et un enregistrement obligatoire d'ordre public (Art. 2019/2020) sous peine de nullité. Le transfert de propriété crée un 'patrimoine d'affectation' distinct (Art. 2025), protégeant le bien des poursuites des autres créanciers du constituant. Si le débiteur ne paie pas, le créancier réalise la sûreté mais la valeur du bien doit être appréciée par expert (Art. 2348) pour lui restituer l'éventuel surplus.",
    ref: "Articles 2011, 2025 et 2372-2 du Code civil / Fiche p.12",
    diff: "hard"
  },
  {
    id: 28,
    cat: "sûretés",
    theme: "Sûretés réelles - Exclusives",
    q: "Comment s'exerce le droit de rétention (Art. 2286 du Code civil) et quel est son sort en cas d'ouverture d'une procédure collective du débiteur ?",
    multi: true,
    opts: [
      "Dans le cas d'un droit de rétention réel (avec dépossession effective), en sauvegarde ou RJ, le juge peut autoriser la reprise du bien à condition de payer préalablement le rétenteur",
      "Le droit de rétention fictif (bénéficiaire d'un gage sans dépossession) is inopposable de plein droit aux créanciers en sauvegarde et RJ, mais redevient utile en liquidation judiciaire (LJ)",
      "Le droit de rétention confère au créancier un droit de suite lui permettant de récupérer le bien s'il a été vendu volontairement à un tiers de bonne foi",
      "Le droit de rétention s'éteint par le dessaisissement volontaire de la chose par le créancier"
    ],
    correct: [0, 1, 3],
    expl: "Le droit de rétention (Art. 2286 cciv) is un pur moyen de blocage sans droit de suite ni de préférence. Il s'éteint par dessaisissement volontaire. En procédure collective : 1) Le rétenteur réel (avec dépossession) is protégé : le juge peut autoriser la restitution de l'actif indispensable mais à charge de désintéresser le rétenteur en priorité. 2) Le rétenteur fictif (gage sans dépossession, Art. 2286 al 4) voit son droit neutralisé en sauvegarde et RJ (inopposabilité), mais il retrouve son efficacité de blocage lors de la liquidation judiciaire (LJ).",
    ref: "Article 2286 du Code civil / Procédures collectives / Fiche p.13, p.16",
    diff: "hard"
  },
  {
    id: 29,
    cat: "sûretés",
    theme: "Sûretés réelles - Préférentielles",
    q: "Selon l'article 2333 du Code civil, quelles sont les conditions de validité d'un contrat de gage et quelle dérogation immobilière is admise depuis la réforme ?",
    multi: false,
    opts: [
      "Le gage ne peut porter que sur des meubles corporels présents; la sanction de la vente sans écrit is la nullité relative",
      "Le gage exige un écrit mentionnant la deete et les biens grevés. Depuis la réforme, le gage peut porter sur certains immeubles par destination (Art. 524/525 cciv, ex: miroirs fixés, machines agricoles) s'il is constitué par le propriétaire de l'immeuble",
      "Le gage de choses futures ou fongibles is strictement nul de plein droit, l'individualisation physique immédiate étant exigée à peine de nullité",
      "Le gage de deete future is valable uniquement si la deete is définitivement liquidée au jour de l'acte"
    ],
    correct: [1],
    expl: "Le gage (Art. 2333 cciv) exige un écrit à titre de validité identifiant la dette et les biens grevés (Art. 2236). Il peut porter sur des biens futurs (Art. 2336) ou fongibles (Art. 2341). Une innovation importante de la réforme permet de gager des 'immeubles par destination' (meubles attachés à perpétuelle demeure d'après 524/525, ou affectés à l'exploitation, ex: panneaux solaires, machines), sous réserve que l'affectation soit le fait du propriétaire de l'immeuble.",
    ref: "Articles 2333, 2336, 524 et 525 du Code civil / Fiche p.14",
    diff: "hard"
  },
  {
    id: 30,
    cat: "sûretés",
    theme: "Sûretés réelles - Préférentielles",
    q: "Deux créanciers se disputent la priorité sur un même bien meuble corporel : la Banque A dispose d'un gage sans dépossession publié le 10 mai, et la Banque B dispose d'un gage avec dépossession effective réalisé le 15 mai. Qui l'emporte d'après l'article 2340 du Code civil ?",
    multi: false,
    opts: [
      "La Banque B l'emporte car la dépossession effective prévaut toujours de plein droit sur une simple publicité au registre",
      "La Banque A l'emporte car l'opposabilité du gage is régie par l'antériorité de sa publication ou de la dépossession; la Banque A ayant publié en premier le 10 mai",
      "Les deux banques concourent à proportion de leurs créances en vertu du principe d'égalité des sûretés réelles",
      "Le débiteur doit désigner arbitrairement qui bénéficie de la priorité sous peine de déchéance du terme"
    ],
    correct: [1],
    expl: "Selon l'article 2340 cciv, le conflit entre créanciers gagistes is réglé par l'ordre des publications. L'opposabilité s'acquiert par la publication (inscription sur le registre national) ou par la dépossession (Art. 2337). La Banque A ayant accompli sa formalité d'opposabilité (inscription) le 10 mai, elle l'emporte sur la Banque B dont la dépossession (opposabilité) n'est intervenue que le 15 mai. L'antériorité de la publicité prévaut sur la dépossession ultérieure.",
    ref: "Articles 2337, 2340 du Code civil / Fiche p.15",
    diff: "hard"
  },
  {
    id: 31,
    cat: "sûretés",
    theme: "Sûretés réelles - Préférentielles",
    q: "Quelles règles encadrent la réalisation du gage conventionnel (Art. 2346 à 2348 du Code civil) en cas d'impayé ?",
    multi: true,
    opts: [
      "La clause de 'voie parée' (permettant au créancier de vendre lui-même le bien à l'amiable sans contrôle judiciaire) is strictement interdite",
      "Le créancier peut devenir propriétaire du bien par l'effet d'un pacte commissoire conventionnel (Art. 2348) ou d'une attribution judiciaire (Art. 2347)",
      "L'appropriation du bien (pacte commissoire ou attribution judiciaire) impose obligatoirement une évaluation objective par expert ou selon cotation officielle pour restituer l'éventuel surplus au débiteur",
      "En sauvegarde ou redressement, le pacte commissoire peut être mis en oeuvre de plein droit sans l'accord de l'administrateur judiciaire"
    ],
    correct: [0, 1, 2],
    expl: "La réalisation du gage obéit à des règles strictes de protection du débiteur : la vente forcée (Art. 2346) exclut la clause de voie parée (qui is nulle). L'appropriation is possible par attribution judiciaire (Art. 2347) ou pacte commissoire conventionnel (Art. 2348). Dans ces deux derniers cas, pour éviter l'enrichissement injustifié du créancier, le bien doit impérativement être évalué par expert (ou cours officiel) à la date du transfert, et le créancier doit restituer le surplus de valeur au constituant.",
    ref: "Articles 2346, 2347 et 2348 du Code civil / Fiche p.16",
    diff: "hard"
  },
  {
    id: 32,
    cat: "sûretés",
    theme: "Sûretés réelles - Préférentielles",
    q: "Selon l'article 2355 du Code civil, quel est le régime juridique par défaut du nantissement, et quelle exclusion fondamentale le distingue du gage ?",
    multi: false,
    opts: [
      "Il est soumis aux règles de l'hypothèque immobilière; il confère un droit de rétention fictif opposable de plein droit",
      "Il est soumis par défaut aux règles du gage de meuble corporel, mais le bénéficiaire d'un nantissement is privé du droit de rétention fictif (l'article 2286 alinéa 4 is exclu)",
      "Le nantissement de créance is un contrat consensuel qui ne requiert aucun écrit pour sa validité",
      "Le créancier nanti dispose d'un droit de rétention réel l'autorisant à appréhender physiquement les biens incorporels"
    ],
    correct: [1],
    expl: "L'article 2355 cciv définit le nantissement comme l'affectation en garantie d'un bien meuble incorporel. En l'absence de texte spécial, il is soumis par défaut aux règles du gage de meuble corporel. Toutefois, le nantissement portant sur des biens incorporels, l'application de l'article 2286 alinéa 4 (qui prévoit un droit de rétention fictif pour le gage sans dépossession) is expressément exclue, car on ne peut retenir fictivement une chose incorporelle sans dépossession.",
    ref: "Article 2355 du Code civil / Fiche p.16",
    diff: "hard"
  },
  {
    id: 33,
    cat: "sûretés",
    theme: "Sûretés réelles - Préférentielles",
    q: "Dans le dénouement d'un nantissement de créance, quelles règles s'appliquent selon l'ordre d'échéance des créances d'après les articles 2364 et 2365 du Code civil ?",
    multi: true,
    opts: [
      "Si la créance nantie arrive à échéance avant la créance garantie, le créancier nanti perçoit les fonds qui sont alors conservés sur un compte spécial (bloqué) ouvert auprès d'un établissement habilité",
      "Si la créance garantie (la deete du débiteur) arrive à échéance en premier et que le débiteur is défaillant, le créancier nanti peut attendre l'échéance de la créance nantie pour se faire payer par son débiteur (Art. 2364)",
      "Le créancier nanti peut demander en justice (ou selon les modalités du contrat) l'attribution de la créance nantie pour en devenir titulaire définitif (Art. 2365)",
      "La créance nantie is automatiquement annulée dès lors que la créance garantie arrive à échéance en premier sans incident"
    ],
    correct: [0, 1, 2],
    expl: "Dénouement du nantissement de créance : 1) Si la créance nantie (la garantie) arrive à échéance en premier, le créancier nanti encaisse les fonds mais doit les consigner sur un compte spécial bloqué car la deete garantie n'est pas encore exigible (Art. 2364). 2) Si la créance garantie arrive à échéance en premier et is impayée, le créancier nanti peut soit attendre l'échéance de la créance nantie pour se faire payer (Art. 2364), soit en demander l'attribution judiciaire ou conventionnelle (Art. 2365) pour en devenir titulaire direct.",
    ref: "Articles 2364 et 2365 du Code civil / Fiche p.17",
    diff: "hard"
  },
  {
    id: 34,
    cat: "sûretés",
    theme: "Sûretés réelles - Préférentielles",
    q: "Un tiers consent une sûreté réelle (gage ou hypothèque sur son propre bien) pour garantir la deete d'un débiteur principal (cautionnement réel / caution réelle). Quelle is la qualification exacte de son engagement sous l'article 2325 du Code civil ?",
    multi: false,
    opts: [
      "Il s'agit d'un cautionnement personnel classique, le tiers engageant l'intégralité de son patrimoine de manière subsidiaire",
      "C'est une sûreté réelle pour autrui : le tiers ne s'engage pas personnellement. L'action du créancier is strictement limitée au bien affecté en garantie, excluant tout droit de gage général sur le reste du patrimoine du garant",
      "L'acte is d'office nul pour absence d'altérité et de cause contractuelle licite",
      "Le garant is solidairement tenu sur tous ses biens propres et revenus sans pouvoir invoquer le bénéfice de discussion"
    ],
    correct: [1],
    expl: "La réforme de 2021 a tranché une longue controverse jurisprudentielle en introduisant l'article 2325 cciv : le tiers qui garantit la deete d'autrui par une sûreté réelle ne s'engage pas personnellement envers le créancier (pas de cautionnement personnel). L'action du créancier is confinée au seul bien affecté à la garantie. Le créancier n'a aucun droit de gage général sur le reste du patrimoine de ce garant réel pour autrui.",
    ref: "Article 2325 du Code civil / Fiche p.11",
    diff: "hard"
  },
  {
    id: 35,
    cat: "sûretés",
    theme: "Sûretés réelles - Préférentielles",
    q: "Dans le cadre d'un nantissement de compte-titres, quelles clauses contractuelles spécifiques régissent les mouvements et la valeur des instruments financiers nantis ?",
    multi: true,
    opts: [
      "La clause d'arrosage : impose au constituant d'ajouter de nouveaux titres ou du cash sur le compte si la valeur du portefeuille baisse",
      "La clause d'accroissement : oblige le constituant à nantir de nouveaux titres si le montant de la deete garantie augmente",
      "La clause d'écrêtement : permet de libérer une partie des titres nantis si leur valeur dépasse largement le plafond de la deete",
      "La clause de voie parée : autorise le créancier nanti à vendre à l'amiable les actions sans recours à l'expert contractuel"
    ],
    correct: [0, 1, 2],
    expl: "Le nantissement de compte-titres (Art. 2355 cciv) s'applique sur un compte d'instruments financiers fluctuants. La pratique a validé 3 clauses clés : 1) Arrosage (reconstitution de marge si le marché baisse). 2) Accroissement (portée de la garantie étendue si la dette augmente). 3) Écrêtement (restitution du surplus de titres si la valeur dépasse largement l'assiette garantie). Comme pour le gage, la clause de voie parée sans respect des formalités légales reste prohibée.",
    ref: "Régime du nantissement de compte-titres / Fiche p.18",
    diff: "hard"
  },
  {
    id: 36,
    cat: "sûretés",
    theme: "Sûretés réelles - Préférentielles",
    q: "Quelles conditions de fond et d'opposabilité régissent le nantissement conventionnel de fonds de commerce d'après le cours ?",
    multi: true,
    opts: [
      "Le constituant doit être propriétaire du fonds; un locataire-gérant n'a pas la capacité de nantir le fonds de commerce",
      "À défaut de désignation expresse dans l'acte écrit, le nantissement ne comprend par défaut que l'enseigne, le nom commercial, la clientèle et le droit au bail",
      "Le nantissement doit faire l'objet d'une inscription obligatoire sur un registre public pour être opposable aux tiers",
      "Le créancier nanti dispose d'un droit de rétention fictif l'autorisant à interdire la cession du stock de marchandises"
    ],
    correct: [0, 1, 2],
    expl: "Pour le nantissement de fonds de commerce : 1) Seul le propriétaire peut le nantir, excluant le locataire-gérant (Art. 2355). 2) L'assiette légale par défaut exclut le matériel et les brevets sauf mention expresse (seuls l'enseigne, le nom, la clientèle et le droit au bail sont inclus d'office). 3) L'opposabilité exige une inscription sur un registre public. Il n'y a aucun droit de rétention (fictif ou réel) sur le fonds de commerce car c'est une universalité incorporelle.",
    ref: "Code de commerce / Assiette nantissement / Fiche p.18",
    diff: "hard"
  },
  {
    id: 37,
    cat: "sûretés",
    theme: "Cautionnement - Recours & Extinction",
    q: "Lorsque le débiteur principal et le créancier se trouvent réciproquement créancier et débiteur (Art. 1347 du Code civil), comment s'exerce l'extinction de l'engagement de caution par la compensation ?",
    multi: false,
    opts: [
      "La compensation n'éteint jamais le cautionnement, car elle constitue une exception strictement personnelle au débiteur principal",
      "Si le débiteur invoque la compensation, la caution is libérée par voie accessoire (Art. 2298). Si le débiteur ne l'invoque pas, la caution peut elle-même l'invoquer en opposant la compensation des deetes réciproques (Art. 1347-6 et 2298)",
      "La caution ne peut se prévaloir de la compensation que si elle a elle-même une créance personnelle directe contre le créancier",
      "La compensation automatique s'applique sans que la caution ou le débiteur n'ait besoin de l'invoquer devant le juge"
    ],
    correct: [1],
    expl: "La compensation (Art. 1347 cciv) éteint les obligations réciproques. Si le débiteur l'invoque, la caution is libérée par voie accessoire. Si le débiteur néglige de l'invoquer, l'article 1347-6 cciv et la réforme de 2021 permettent expressément à la caution d'opposer elle-même la compensation de la deete du débiteur avec celle du créancier, ce qui éteint l'obligation de garantie.",
    ref: "Articles 1347-6 and 2298 du Code civil / Fiche p.7",
    diff: "hard"
  },
  {
    id: 38,
    cat: "sûretés",
    theme: "Cautionnement - Caractéristiques",
    q: "Quelle différence fondamentale distingue le sous-cautionnement (Art. 2291 du Code civil) de la certification de caution ?",
    multi: false,
    opts: [
      "Le sous-cautionnement garantit le créancier, tandis que la certification garantit le débiteur principal",
      "Le sous-cautionnement est un contrat par lequel une personne s'engage envers la caution à lui payer ce que le débiteur principal pourrait lui devoir à la suite de ses recours. La certification de caution garantit directement le créancier en cas de défaillance de la première caution",
      "La certification de caution is une sûreté réelle, tandis que le sous-cautionnement is un cautionnement d'ordre public",
      "Le sous-cautionnement requiert obligatoirement un acte notarié, ce qui n'est pas le cas pour la certification"
    ],
    correct: [1],
    expl: "Le sous-cautionnement (Art. 2291 cciv) is le cautionnement de la caution : un tiers s'engage envers la caution initiale à l'indemniser des sommes qu'elle aura payées et qu'elle n'aura pu récupérer du débiteur. La certification de caution is une garantie directe pour le créancier : le certificateur garantit au créancier le paiement de la deete si la première caution défaille.",
    ref: "Article 2291 du Code civil / Fiche p.2",
    diff: "hard"
  },
  {
    id: 39,
    cat: "sûretés",
    theme: "Garantie Autonome",
    q: "Quelles conditions de forme et d'opposabilité régissent la constitution d'une Garantie Autonome (GA) d'après le Code civil ?",
    multi: true,
    opts: [
      "La Garantie Autonome est un contrat unilatéral soumis à l'article 1376 du Code civil, qui exige à peine de nullité une mention écrite/manuscrite de la somme garantie",
      "Le montant garanti par une GA peut être contractuellement inférieur, égal ou supérieur à la deete principale, illustrant l'indépendance de la sûreté",
      "L'acte peut être entièrement verbal dès lors qu'il implique deux personnes morales de droit commercial",
      "L'accord du conjoint sous l'article 1415 du Code civil is obligatoire pour engager les revenus d'une caution autonome physique"
    ],
    correct: [0, 1],
    expl: "La Garantie Autonome (GA) is régie par l'article 2321 cciv. S'agissant d'un engagement unilatéral de payer une somme d'argent, elle is soumise à l'article 1376 cciv qui impose une mention manuscrite de la somme (chiffres et lettres). L'indépendance de la GA autorise un montant décorrélé de la dette principale (inférieur, égal ou supérieur, contrairement au cautionnement). L'article 1415 ne s'applique pas directement à la GA (qui n'est pas un cautionnement) mais la jurisprudence applique des règles de protection similaires pour les époux.",
    ref: "Articles 2321, 1376 du Code civil / Fiche p.8",
    diff: "hard"
  },
  {
    id: 40,
    cat: "sûretés",
    theme: "Sûretés réelles - Exclusives",
    q: "Dans le cadre d'un contrat de crédit-bail mobilier (leasing), comment s'opère l'opposabilité de la propriété du crédit-bailleur à l'égard des tiers en l'absence de publicité ?",
    multi: false,
    opts: [
      "La propriété du crédit-bailleur is absolument inopposable aux tiers dans tous les cas dès lors qu'aucune publicité n'a été faite",
      "Si la publicité requise n'a pas été effectuée, le crédit-bailleur peut néanmoins opposer son droit de propriété aux tiers s'il établit que ces derniers avaient connaissance de l'existence du crédit-bail",
      "Le crédit-bailleur perd la propriété du matériel au profit du crédit-preneur en cas de défaut de publication sous 48 heures",
      "La publicité du crédit-bail is facultative et n'affecte jamais l'opposabilité de la propriété aux tiers"
    ],
    correct: [1],
    expl: "Dans le crédit-bail, le crédit-bailleur reste propriétaire du bien. Pour opposer cette propriété aux tiers, il doit effectuer une publicité légale. S'il ne l'a pas faite, sa propriété is inopposable, sauf s'il démontre que le tiers acquéreur ou créancier saisissant connaissait l'existence du contrat de crédit-bail (mauvaise foi du tiers). S'il y a publicité, elle is pleinement opposable aux tiers.",
    ref: "Régime du crédit-bail / Fiche p.11",
    diff: "hard"
  },
  
  // ==========================================
  // ==========================================
  // ====== IMPÔT SUR LES SOCIÉTÉS (IS) - EXAM =
  // ==========================================
  {
    id: 41,
    cat: "is",
    theme: "Acte Anormal de Gestion",
    q: "Comment se définit textuellement l'Acte Anormal de Gestion (AAG) d'après la jurisprudence du Conseil d'État ?",
    multi: false,
    opts: [
      "Tout acte commis de mauvaise foi par un dirigeant de société",
      "L'acte par lequel une entreprise décide de s'appauvrir à des fins étrangères à son intérêt",
      "Toute dépense excédant de plus de 10% le budget annuel prévisionnel",
      "Une opération de fusion non visée par l'assemblée des associés"
    ],
    correct: [1],
    expl: "L'AAG est caractérisé par un appauvrissement intentionnel et matériel de l'entreprise consenti à des fins contraires ou étrangères à son propre intérêt d'exploitation (Art. 38 CGI).",
    ref: "Jurisprudence constante / Article 38 du CGI",
    diff: "easy"
  },
  {
    id: 42,
    cat: "is",
    theme: "Acte Anormal de Gestion",
    q: "Qui porte la charge de la preuve d'un Acte Anormal de Gestion (AAG) d'après l'arrêt Société Renfort Service (1984) ?",
    multi: false,
    opts: [
      "Le contribuable (la société) doit prouver la normalité de l'acte",
      "L'administration fiscale doit prouver que l'acte est anormal",
      "Le commissaire aux comptes d'office",
      "Le tribunal administratif après expertise obligatoire"
    ],
    correct: [1],
    expl: "L'arrêt Société Renfort Service de 1984 pose le principe selon lequel c'est à l'administration fiscale d'apporter la preuve de l'anormalité de la gestion (sauf s'il existe une présomption d'anormalité comme un prêt sans intérêt).",
    ref: "Arrêt CE, Société Renfort Service 1984",
    diff: "medium"
  },
  {
    id: 43,
    cat: "is",
    theme: "Acte Anormal de Gestion",
    q: "Quelles conditions cumulatives doivent être prouvées par l'administration fiscale pour caractériser un AAG ? (Sélectionner 2 réponses)",
    multi: true,
    opts: [
      "Élément intentionnel : la société a conscience d'agir contre son propre intérêt",
      "Élément matériel : un appauvrissement effectif de l'entreprise (ou renonciation à recette)",
      "Un profit personnel direct d'un associé détenant plus de 50%",
      "L'immatriculation de la filiale dans un paradis fiscal"
    ],
    correct: [0, 1],
    expl: "L'administration fiscale doit démontrer à la fois l'existence d'un élément matériel (un appauvrissement ou une perte de recette pour l'entreprise) et d'un élément intentionnel (la conscience de conclure un acte contraire à l'intérêt social).",
    ref: "Arrêt CE, Croë Suisse 2018 / Cours p.1",
    diff: "hard"
  },
  {
    id: 44,
    cat: "is",
    theme: "Abus de droit",
    q: "Qu'est-ce que l'abus de droit par dissimulation ou simulation au sens de l'article L64 du LPF ?",
    multi: false,
    opts: [
      "Un simple retard volontaire dans le dépôt des liasses fiscales",
      "Le fait d'écarter un acte fictif ou déguisé qui cache la réalité économique d'une opération pour éluder l'impôt",
      "L'inscription d'une fausse adresse de siège social",
      "L'omission de déclaration des salaires des dirigeants"
    ],
    correct: [1],
    expl: "L'abus de droit par simulation (Art. L64 LPF) permet à l'administration fiscale d'écarter les actes mensongers ou fictifs (ex: donation déguisée en vente, fausses factures) pour appliquer la fiscalité de l'acte réel.",
    ref: "Article L64 du Livre des procédures fiscales",
    diff: "medium"
  },
  {
    id: 45,
    cat: "is",
    theme: "Abus de droit",
    q: "Quels sont les trois critères cumulatifs caractérisant l'abus de droit par 'fraude à la loi' ? (Sélectionner 3 réponses)",
    multi: true,
    opts: [
      "Une intention exclusivement fiscale (ou motif déterminant d'après Garnier Holding)",
      "Le détournement du texte (respect de la lettre mais violation de l'esprit de la loi)",
      "L'obtention d'un gain fiscal effectif (économie d'impôt)",
      "L'absence totale de forme sociale de la société"
    ],
    correct: [0, 1, 2],
    expl: "La fraude à la loi repose sur trois piliers : l'utilisation littérale d'un texte légal pour en détourner l'esprit, dans un but exclusivement fiscal, afin d'obtenir un gain ou une économie d'impôt abusive.",
    ref: "Article L64 LPF / Arrêt Garnier Holding 2013",
    diff: "hard"
  },
  {
    id: 46,
    cat: "is",
    theme: "Abus de droit",
    q: "Quel taux de majoration fiscale s'applique de plein droit en cas d'abus de droit caractérisé ?",
    multi: false,
    opts: [
      "10% d'office",
      "80% en principe (ramené à 40% si le contribuable n'est pas le principal initiateur/bénéficiaire)",
      "100% de la base imposable d'exploitation",
      "Une pénalité forfaitaire de 150 000 euros"
    ],
    correct: [1],
    expl: "L'abus de droit est sanctionné de manière très lourde par l'article 1729 du CGI : une majoration de 80%, qui peut être ramenée à 40% s'il est établi que le contribuable n'a pas eu l'initiative principale du montage.",
    ref: "Article 1729 du CGI / Cours p.2",
    diff: "medium"
  },
  {
    id: 47,
    cat: "is",
    theme: "Abus de droit",
    q: "Quelle est la portée de la clause générale anti-abus de l'article 205A du CGI (ATAD 2016) ?",
    multi: false,
    opts: [
      "Elle interdit les fusions de sociétés de personnes à l'IR",
      "Elle écarte les montages non authentiques conclus dans le but 'principal' d'obtenir un avantage fiscal contraire à l'objet du texte",
      "Elle plafonne les charges financières déductibles à 1M€",
      "Elle n'est applicable qu'aux particuliers soumis à l'IR"
    ],
    correct: [1],
    expl: "L'article 205A CGI transpose la directive européenne ATAD. Plus souple que l'article L64 LPF, il permet d'écarter un montage s'il est 'non authentique' (manque de réalité économique) et s'il a un but 'principalement' fiscal (au lieu d'exclusivement fiscal).",
    ref: "Article 205A du CGI",
    diff: "hard"
  },
  {
    id: 48,
    cat: "is",
    theme: "Territorialité",
    q: "En vertu du principe de territorialité (Art. 209-I CGI), une société française réalisant des bénéfices via une succursale en Italie :",
    multi: false,
    opts: [
      "Est imposable en France sur ces bénéfices car son siège social est en France",
      "N'est pas imposable en France sur ces bénéfices italiens",
      "Est soumise à une double imposition forfaitaire de 25% dans les deux pays",
      "Bénéficie d'un crédit d'impôt automatique de 100%"
    ],
    correct: [1],
    expl: "L'IS français est strictement territorial : les bénéfices d'une succursale (établissement stable) exploitée à l'étranger échappent à l'impôt sur les sociétés français et sont taxés localement.",
    ref: "Article 209-I du CGI",
    diff: "easy"
  },
  {
    id: 49,
    cat: "is",
    theme: "Territorialité",
    q: "Quels sont les trois critères alternatifs en droit interne pour définir une 'entreprise exploitée en France' ? (Sélectionner 3 réponses)",
    multi: true,
    opts: [
      "L'existence d'un établissement caractérisé (installation stable pro)",
      "La présence d'un représentant dépendant ayant le pouvoir d'engager la société étrangère",
      "La réalisation d'un cycle commercial complet (opérations cohérentes et complètes)",
      "Le fait que l'un des associés possède la nationalité française"
    ],
    correct: [0, 1, 2],
    expl: "La jurisprudence retient trois critères alternatifs pour caractériser l'exploitation d'une entreprise en France : l'établissement autonome, le représentant dépendant, ou le cycle commercial complet.",
    ref: "Article 209-I CGI / Jurisprudence du Conseil d'État",
    diff: "hard"
  },
  {
    id: 50,
    cat: "is",
    theme: "Territorialité",
    q: "Selon l'arrêt CE Zimmer (2010), à quelle condition un commissionnaire constitue-t-il un établissement stable ?",
    multi: false,
    opts: [
      "Dès lors qu'il vend des produits de marque étrangère",
      "S'il ressort du contrat ou des circonstances que le commettant étranger est personnellement engagé par les contrats conclus avec les tiers",
      "Uniquement s'il détient plus de 50% des stocks du commettant",
      "S'il réalise plus d'un million d'euros de chiffre d'affaires annuel"
    ],
    correct: [1],
    expl: "L'arrêt Zimmer du Conseil d'État (2010) encadre la notion d'agent dépendant/commissionnaire. Le commissionnaire n'est un établissement stable que s'il dispose du pouvoir d'engager juridiquement la société commettante.",
    ref: "Arrêt CE, Zimmer 2010",
    diff: "hard"
  },
  {
    id: 51,
    cat: "is",
    theme: "Personnes imposables",
    q: "Quelles formes de sociétés sont soumises de plein droit à l'IS quel que soit leur objet ? (Sélectionner 2 réponses)",
    multi: true,
    opts: [
      "Les sociétés de capitaux (SA, SCA, SARL, EURL)",
      "Les sociétés de personnes civiles (SCI immobilières simples)",
      "Les sociétés en nom collectif (SNC) n'ayant pas opté",
      "Les sociétés par actions simplifiées (SAS)"
    ],
    correct: [0, 3],
    expl: "Les sociétés par actions (SA, SAS, SCA) et les SARL (sauf SARL de famille sous option) sont assujetties de plein droit et obligatoirement à l'impôt sur les sociétés.",
    ref: "Article 206 du CGI",
    diff: "medium"
  },
  {
    id: 52,
    cat: "is",
    theme: "Personnes imposables",
    q: "Quels sont les 4 critères cumulatifs de non-lucrativité d'une association (règle des 4P) ? (Sélectionner 4 réponses)",
    multi: true,
    opts: [
      "Le Produit proposé (nature de l'activité)",
      "Le Public visé (clientèle ciblée)",
      "Le Prix pratiqué (similaire ou inférieur au marché)",
      "La Publicité réalisée (promotion commerciale)",
      "Le Patrimoine net immobilisé de l'association"
    ],
    correct: [0, 1, 2, 3],
    expl: "Une association est exonérée d'IS si elle a une gestion désintéressée et ne concurrence pas le secteur commercial déloyalement, ce qui s'apprécie selon la règle des 4P : Produit, Public, Prix, Publicité.",
    ref: "Instruction fiscale / Règle des 4P",
    diff: "hard"
  },
  {
    id: 53,
    cat: "is",
    theme: "Produits & Rattachements",
    q: "Sous la comptabilité d'engagement obligatoire à l'IS, quel est le fait générateur de rattachement pour les ventes de biens ?",
    multi: false,
    opts: [
      "La signature du devis commercial",
      "Le paiement de l'acompte initial",
      "La livraison des biens (moment de la mise à disposition)",
      "La clôture annuelle de l'exercice fiscal"
    ],
    correct: [2],
    expl: "En comptabilité d'engagement, les ventes de biens corporels sont rattachées à l'exercice au cours duquel intervient la livraison matérielle du bien, rendant la créance certaine dans son principe et son montant.",
    ref: "Article 38-2a du CGI",
    diff: "medium"
  },
  {
    id: 54,
    cat: "is",
    theme: "Produits & Rattachements",
    q: "Pour les prestations de services instantanées, quel est le critère de rattachement fiscal des produits ?",
    multi: false,
    opts: [
      "L'encaissement effectif du prix",
      "L'achèvement complet de la prestation",
      "La signature du contrat de mandat",
      "L'émission d'un bon de commande pro-forma"
    ],
    correct: [1],
    expl: "Contrairement aux ventes de biens, le rattachement des prestations de services instantanées s'opère lors de l'achèvement complet de la prestation.",
    ref: "Article 38-2a du CGI / Régime des prestations",
    diff: "medium"
  },
  {
    id: 55,
    cat: "is",
    theme: "Produits & Rattachements",
    q: "Quelles sont les deux méthodes reconnues et acceptées en fiscalité pour le rattachement des chantiers à long terme (travaux) ? (Sélectionner 2 réponses)",
    multi: true,
    opts: [
      "La méthode de l'achèvement (comptabilisation globale en fin de chantier)",
      "La méthode de l'avancement (comptabilisation graduelle par exercice)",
      "La méthode de caisse pure (au prorata des encaissements)",
      "La méthode d'amortissement dégressif inversé"
    ],
    correct: [0, 1],
    expl: "Pour les contrats de travaux à long terme s'étalant sur plusieurs exercices, l'entreprise peut choisir d'appliquer soit la méthode de l'achèvement, soit la méthode de l'avancement.",
    ref: "Règles comptables et fiscales / Cours p.6",
    diff: "hard"
  },
  {
    id: 56,
    cat: "is",
    theme: "Produits & Rattachements",
    q: "Comment sont imposées fiscalement les subventions de fonctionnement reçues par une société à l'IS ?",
    multi: false,
    opts: [
      "Elles sont exonérées d'impôt d'office",
      "Elles sont rattachées en totalité au résultat fiscal de l'exercice au cours duquel la décision d'octroi est devenue certaine",
      "Elles sont étalées obligatoirement sur une durée forfaitaire de 10 ans",
      "Elles sont soumises au taux réduit de 15% sans condition"
    ],
    correct: [1],
    expl: "Les subventions de fonctionnement constituent un produit d'exploitation imposable au taux normal de l'IS (25%) et doivent être rattachées à l'exercice au cours duquel l'octroi est certain et son montant déterminé.",
    ref: "Article 38-2 du CGI / Régime des subventions",
    diff: "medium"
  },
  {
    id: 40 + 17,
    cat: "is",
    theme: "Produits & Rattachements",
    q: "Quel est l'avantage fiscal offert par le régime des subventions d'équipement ?",
    multi: false,
    opts: [
      "L'exonération totale de TVA immobilière",
      "La possibilité d'étaler l'imposition de la subvention au rythme de l'amortissement du bien financé",
      "La déduction des frais de transport du bien à 100%",
      "L'autorisation de prêter sans intérêt à une filiale étrangère"
    ],
    correct: [1],
    expl: "Par dérogation au droit commun, les subventions d'équipement destinées à acquérir une immobilisation peuvent être imposées de manière étalée, au même rythme que l'amortissement de l'actif financé.",
    ref: "Article 42 septies du CGI",
    diff: "hard"
  },
  {
    id: 40 + 18,
    cat: "is",
    theme: "Produits & Rattachements",
    q: "Quelle est la fiscalité applicable aux plus-values à long terme réalisées sur la cession de 'titres de participation' détenus depuis plus de 2 ans ?",
    multi: false,
    opts: [
      "Elles sont taxées au taux forfaitaire de 19%",
      "Elles sont exonérées d'IS, sous réserve de la réintégration d'une quote-part de frais et charges de 12% dans le résultat imposable",
      "Elles sont imposées au taux normal de 25% sans abattement",
      "Elles sont soumises à une retenue à la source libératoire de 30%"
    ],
    correct: [1],
    expl: "Les plus-values de cession de titres de participation détenus depuis au moins 2 ans bénéficient d'une exonération d'IS, sauf réintégration d'une quote-part de frais et charges (QPFC) fixe de 12% calculée sur le montant brut de la plus-value.",
    ref: "Article 219-I-a quinquies du CGI",
    diff: "hard"
  },
  {
    id: 40 + 19,
    cat: "is",
    theme: "Charges Déductibles",
    q: "Quelles conditions de fond doivent être remplies pour qu'une charge soit fiscalement déductible à l'IS ? (Sélectionner 3 réponses)",
    multi: true,
    opts: [
      "La dépense doit être engagée dans l'intérêt direct de l'exploitation de l'entreprise",
      "La charge ne doit pas être excessive (proportionnée à l'activité)",
      "La charge doit se traduire par une diminution de l'actif net (et non par l'acquisition d'une immobilisation)",
      "Le paiement doit impérativement être visé par le fisc à l'avance"
    ],
    correct: [0, 1, 2],
    expl: "Pour être déductible, une charge doit remplir des conditions de forme (justifiée, factures, enregistrée en comptabilité) et de fond (faite dans l'intérêt direct de l'entreprise, non excessive).",
    ref: "Article 39-1 du CGI",
    diff: "medium"
  },
  {
    id: 40 + 20,
    cat: "is",
    theme: "Charges Déductibles",
    q: "Quels impôts payés par l'entreprise constituent des charges déductibles de l'IS ? (Sélectionner 2 réponses)",
    multi: true,
    opts: [
      "La taxe foncière sur les immeubles professionnels de la société",
      "La taxe sur les salaires ou la taxe d'apprentissage",
      "L'impôt sur les sociétés lui-même",
      "Les amendes et pénalités de retard d'IS ou de TVA"
    ],
    correct: [0, 1],
    expl: "La taxe foncière professionnelle, la taxe sur les salaires et la CFE sont déductibles. En revanche, l'IS lui-même ainsi que toutes les amendes fiscales ou pénalités administratives ne sont jamais déductibles (Art. 39-2).",
    ref: "Article 39-1-4° et Article 39-2 du CGI",
    diff: "hard"
  },
  {
    id: 40 + 21,
    cat: "is",
    theme: "Charges Déductibles",
    q: "À quelle condition les dépenses de parrainage (sponsoring) sont-elles déductibles à l'IS ?",
    multi: false,
    opts: [
      "Elles sont déductibles uniquement si l'association parrainée est reconnue d'utilité publique",
      "Elles sont déductibles si l'entreprise en retire une contrepartie directe de visibilité (logo, pub) proportionnée au coût",
      "Elles ne sont jamais déductibles, étant assimilées à des dépenses somptuaires",
      "Elles sont plafonnées à 0,5% du chiffre d'affaires"
    ],
    correct: [1],
    expl: "Les dépenses de sponsoring (parrainage) sont des charges d'exploitation déductibles si la publicité apportée est réelle et si le coût reste raisonnable et proportionné par rapport au chiffre d'affaires.",
    ref: "Article 39-1-7° du CGI / Sponsoring",
    diff: "medium"
  },
  {
    id: 40 + 22,
    cat: "is",
    theme: "Amortissements",
    q: "Quelles conditions cumulatives caractérisent un actif amortissable ? (Sélectionner 3 réponses)",
    multi: true,
    opts: [
      "Il doit s'agir d'une immobilisation inscrite à l'actif du bilan",
      "L'utilisation de l'actif doit être limitée dans le temps (usure physique, technique ou juridique)",
      "La perte de valeur de l'actif doit être certaine et irréversible",
      "Le bien doit avoir été acheté en espèces pour un montant inférieur à 500€"
    ],
    correct: [0, 1, 2],
    expl: "L'amortissement fiscal répartit le coût d'une immobilisation sur sa durée d'utilisation probable. Le bien doit être inscrit à l'actif, s'user de manière prévisible dans le temps, et la perte de valeur doit être certaine et irréversible.",
    ref: "Article 39-1-2° du CGI / Cours p.9",
    diff: "medium"
  },
  {
    id: 40 + 23,
    cat: "is",
    theme: "Amortissements",
    q: "Quelle est la règle fiscale concernant l'amortissement du fonds de commerce ?",
    multi: false,
    opts: [
      "Le fonds de commerce s'amortit obligatoirement de manière linéaire sur 5 ans",
      "Le fonds de commerce n'est pas amortissable par principe car sa durée de vie est indéfinie, sauf exception temporaire post-2022 pour les PME",
      "Il s'amortit uniquement si le chiffre d'affaires est inférieur à 100K€",
      "L'amortissement est interdit sans possibilité de dérogation"
    ],
    correct: [1],
    expl: "Un fonds de commerce a une durée d'utilité non limitée et n'est donc pas amortissable (dépréciation uniquement par voie de provision). Cependant, la réforme de 2022 autorise temporairement les petites entreprises à amortir leurs fonds de commerce acquis de tiers.",
    ref: "Loi de finances 2022 / Amortissement des fonds",
    diff: "hard"
  },
  {
    id: 40 + 24,
    cat: "is",
    theme: "Provisions & Dépréciations",
    q: "Quelles conditions cumulatives doivent être réunies pour déduire fiscalement une provision à la clôture de l'exercice ? (Sélectionner 4 réponses)",
    multi: true,
    opts: [
      "Existence d'une obligation juridique ou implicite envers un tiers",
      "Sortie de ressources probable sans contrepartie équivalente",
      "La charge doit être probable (non éventuelle) et résulter d'événements en cours à la clôture",
      "Le montant doit être évaluable avec une précision suffisante",
      "L'approbation expresse de l'assemblée générale extraordinaire"
    ],
    correct: [0, 1, 2, 3],
    expl: "Une provision pour risque ou charge est déductible si elle répond à 4 conditions strictes : une obligation de payer, une sortie probable d'argent, une probabilité nette basée sur des faits réels, et un calcul précis.",
    ref: "Article 39-1-5° du CGI / Trames cas pratique",
    diff: "hard"
  },
  {
    id: 40 + 25,
    cat: "is",
    theme: "Provisions & Dépréciations",
    q: "Pour déduire fiscalement une provision pour litige commercial en cours, quelle condition est requise d'après la liasse fiscale ?",
    multi: false,
    opts: [
      "Le litige doit avoir fait l'objet d'un procès effectivement engagé à la clôture de l'exercice",
      "Le litige doit être réglé à l'amiable",
      "Le gérant doit démissionner avant la clôture",
      "La provision doit dépasser 100 000 euros"
    ],
    correct: [0],
    expl: "Une provision pour litige n'est déductible que si la procédure judiciaire est déjà engagée (litige en cours) ou si les faits générateurs du litige sont survenus avant la clôture, rendant le risque de condamnation probable.",
    ref: "Article 39-1-5° du CGI / Litiges",
    diff: "hard"
  },
  {
    id: 40 + 26,
    cat: "is",
    theme: "Amortissements",
    q: "Quelle est la sanction fiscale si une entreprise omet de comptabiliser l'amortissement linéaire minimal obligatoire lors d'un exercice ?",
    multi: false,
    opts: [
      "Une amende pénale forfaitaire de 10 000 €",
      "La perte définitive du droit de déduire fiscalement cet amortissement (amortissement régulièrement différé)",
      "La nullité de l'assemblée générale d'approbation des comptes",
      "La requalification automatique de la société en société de personnes"
    ],
    correct: [1],
    expl: "L'amortissement minimal linéaire obligatoire doit être comptabilisé à chaque exercice. À défaut, l'amortissement non pratiqué est définitivement perdu pour la déduction fiscale (règle de l'amortissement régulièrement différé).",
    ref: "Article 39-1-2° du CGI / Amortissements irréguliers",
    diff: "hard"
  },
  {
    id: 40 + 27,
    cat: "is",
    theme: "Amortissements",
    q: "Dans quelles catégories de techniques d'amortissement fiscal retrouve-t-on le 'suramortissement' ?",
    multi: false,
    opts: [
      "L'amortissement linéaire classique",
      "La méthode de l'amortissement dégressif exceptionnel",
      "Une méthode d'incitation fiscale accordant une déduction supplémentaire temporaire",
      "Un amortissement réservé uniquement aux SCI immobilières familiales"
    ],
    correct: [2],
    expl: "Le suramortissement est une technique fiscale d'incitation à l'investissement qui permet de déduire extra-comptablement un pourcentage supplémentaire de la valeur d'origine de l'actif.",
    ref: "Règles fiscales / Amortissements fiscaux",
    diff: "medium"
  },
  {
    id: 40 + 28,
    cat: "is",
    theme: "Abus de droit",
    q: "Dans l'abus de droit par simulation, l'acte simulé :",
    multi: false,
    opts: [
      "Est un acte parfaitement légal et encouragé par l'administration",
      "Est fictif, déguisé, ou dissimule la réalité de l'opération économique",
      "Requiert obligatoirement l'accord d'un tiers garant chirographaire",
      "Est exonéré de toute majoration de l'article 1729"
    ],
    correct: [1],
    expl: "L'acte simulé est un mensonge juridique : il crée une apparence fictive ou dissimule la nature réelle d'une opération pour réduire indûment la base imposable.",
    ref: "Article L64 du LPF / Abus de droit",
    diff: "medium"
  },
  {
    id: 40 + 29,
    cat: "is",
    theme: "Provisions & Dépréciations",
    q: "Comment sont traitées fiscalement les provisions pour créances douteuses ?",
    multi: false,
    opts: [
      "Elles ne sont jamais déductibles, le risque devant être certain",
      "Elles sont déductibles si la créance est individualisée, que le risque de non-recouvrement est probable, et que la situation du débiteur est problematic",
      "Elles s'étalent sur une durée fixe de 5 ans",
      "Elles s'imputent directement sur la TVA d'exploitation"
    ],
    correct: [1],
    expl: "Une provision pour créance douteuse est déductible si elle est individualisée, s'appuie sur des indices réels de défaillance (ex: poursuites, redressement judiciaire), et que la perte est probable.",
    ref: "Article 39-1-5° du CGI / Créances douteuses",
    diff: "medium"
  },
  {
    id: 40 + 30,
    cat: "is",
    theme: "Abus de droit",
    q: "Quel exemple de montage fiscal consiste à prêter des actions à une banque française temporairement pour éviter la retenue à la source sur les dividendes ?",
    multi: false,
    opts: [
      "Le montage Carry-back",
      "Le montage Cumcum",
      "Le montage Dailly",
      "Le montage Zimmer"
    ],
    correct: [1],
    expl: "Le montage Cumcum consiste à céder ou prêter des actions à une banque française juste avant le détachement de dividende pour éviter la retenue à la source applicable aux non-résidents.",
    ref: "Exemple du cours / Cumcum",
    diff: "hard"
  },
  {
    id: 40 + 31,
    cat: "is",
    theme: "Abus de droit",
    q: "L'arrêt Société Janfin (2006) rendu par le Conseil d'État :",
    multi: false,
    opts: [
      "A interdit l'assujettissement des associations de droit public à l'IS",
      "A consacré pleinement la notion d'abus de droit pour fraude à la loi même hors texte",
      "A plafonné l'amortissement linéaire des fonds de commerce",
      "A créé une décharge totale pour les aides de survie entre filiales"
    ],
    correct: [1],
    expl: "Dans l'arrêt Société Janfin de 2006, le Conseil d'État a officiellement consacré la notion d'abus de droit par fraude à la loi d'après un principe général du droit, indépendamment de l'article L64 LPF.",
    ref: "Arrêt CE, Société Janfin 2006",
    diff: "hard"
  },
  {
    id: 40 + 32,
    cat: "is",
    theme: "Abus de droit",
    q: "Quelle différence distingue l'abus de droit de l'Acte Anormal de Gestion (AAG) ?",
    multi: false,
    opts: [
      "L'abus de droit est exclusivement civil, l'AAG est pénal",
      "L'AAG repose sur un acte d'appauvrissement hors de l'intérêt social, alors que l'abus de droit repose sur le détournement ou la fictivité d'un texte légal",
      "L'AAG n'entraîne jamais de redressement financier",
      "Il n'y a aucune différence, ce sont deux termes synonymes en fiscalité"
    ],
    correct: [1],
    expl: "L'AAG sanctionne un acte qui sort de l'intérêt d'exploitation de la société (l'intérêt social). L'abus de droit (simulation ou fraude à la loi) s'attaque à l'utilisation mensongère ou dévoyée des textes pour éluder l'impôt.",
    ref: "Articles 38 CGI / L64 LPF",
    diff: "hard"
  },
  {
    id: 40 + 33,
    cat: "is",
    theme: "Personnes imposables",
    q: "Une société en nom collectif (SNC) n'ayant pas formulé d'option à l'IS est soumise à (Art. 206 CGI) :",
    multi: false,
    opts: [
      "L'Impôt sur les Sociétés d'office",
      "L'Impôt sur le Revenu des associés (translucidité fiscale)",
      "Une franchise fiscale totale d'exploitation",
      "Une taxe forfaitaire nationale de 15%"
    ],
    correct: [1],
    expl: "Les sociétés de personnes (comme la SNC) sont fiscalement translucides : en l'absence d'option pour l'IS, leurs bénéfices sont directement imposés au nom des associés au prorata de leurs parts dans la catégorie correspondante (IR).",
    ref: "Article 206 du CGI / Sociétés de personnes",
    diff: "medium"
  },
  {
    id: 40 + 34,
    cat: "is",
    theme: "Territorialité",
    q: "Quelles conditions d'installation d'affaires caractérisent un établissement stable ? (Sélectionner 3 réponses)",
    multi: true,
    opts: [
      "Une installation matérielle permanente (bureau, usine, local commercial)",
      "Un caractère de fixité (présence stable non temporaire)",
      "L'exercice régulier et productif d'une activité génératrice de revenus",
      "La détention d'au moins 75% du capital par des investisseurs italiens"
    ],
    correct: [0, 1, 2],
    expl: "Un établissement stable (critères internationaux) exige des locaux matériels, une fixité temporelle, et l'exercice d'une activité réelle, régulière et productive génératrice de profit autonome.",
    ref: "Conventions OCDE / Établissement stable",
    diff: "hard"
  },
  {
    id: 40 + 35,
    cat: "is",
    theme: "Charges Déductibles",
    q: "Dans quelles conditions les cadeaux d'affaires de valeur significative (> 3 000€ au total) sont-ils déductibles ?",
    multi: false,
    opts: [
      "Ils sont entièrement exclus de la déduction",
      "Ils sont déductibles si justifiés par l'intérêt de la société et obligatoirement déclarés sur le relevé spécial des frais généraux",
      "Ils sont déductibles uniquement si offerts à des fonctionnaires",
      "Ils sont soumis au taux réduit d'IS de 15% d'office"
    ],
    correct: [1],
    expl: "Les cadeaux d'affaires sont déductibles s'ils sont faits dans l'intérêt commercial direct de l'entreprise et ne sont pas excessifs. S'ils dépassent 3 000€ par exercice, ils doivent être portés sur le relevé spécial (Art. 39-5 du CGI).",
    ref: "Article 39-5 du CGI",
    diff: "hard"
  },
  {
    id: 40 + 36,
    cat: "is",
    theme: "Charges Déductibles",
    q: "Comment sont traitées les amendes pénales de circulation payées pour les véhicules de fonction de l'entreprise ?",
    multi: false,
    opts: [
      "Elles sont déductibles en totalité",
      "Elles sont non déductibles d'après l'article 39-2 du CGI et doivent être réintégrées extra-comptablement",
      "Elles ouvrent droit à un crédit d'impôt de 50%",
      "Elles sont soumises à la TVA au taux réduit"
    ],
    correct: [1],
    expl: "Toutes les pénalités et amendes (de circulation, administratives, fiscales) prononcées à l'encontre de la société ou de ses salariés sont exclues du droit de déduction fiscale par l'article 39-2 du CGI.",
    ref: "Article 39-2 du CGI",
    diff: "easy"
  },
  {
    id: 40 + 37,
    cat: "is",
    theme: "Provisions & Dépréciations",
    q: "La provision pour litige d'un redressement fiscal contesté en justice est-elle déductible fiscalement ?",
    multi: false,
    opts: [
      "Oui, en totalité",
      "Non, l'impôt contesté et les pénalités correspondantes ne peuvent pas faire l'objet d'une provision fiscalement déductible d'après la loi",
      "Uniquement à hauteur de 10% du capital social de la société",
      "Seulement si l'entreprise est en cours de liquidation amiable"
    ],
    correct: [1],
    expl: "Une provision pour impôt contesté ou pénalités de redressement n'est pas déductible du résultat fiscal car l'impôt sur les sociétés et les pénalités correspondantes ne sont eux-mêmes pas déductibles par nature.",
    ref: "Règles comptables et fiscales / Provisions non déductibles",
    diff: "hard"
  },
  {
    id: 40 + 38,
    cat: "is",
    theme: "Charges Déductibles",
    q: "Les primes d'assurance 'Homme Clé' (dirigeant essentiel) sont-elles déductibles à l'IS ?",
    multi: false,
    opts: [
      "Non, jamais",
      "Oui, s'il s'agit d'une assurance temporaire décès souscrite au profit de l'entreprise pour compenser la perte financière liée à la disparition de l'homme clé",
      "Uniquement s'il s'agit d'un contrat de placement financier de type assurance-vie de capitalisation",
      "Seulement si le capital garanti est inférieur à 15 000€"
    ],
    correct: [1],
    expl: "L'assurance Homme Clé est déductible si le contrat couvre le décès ou l'incapacité d'un collaborateur indispensable, la société étant désignée bénéficiaire exclusive pour compenser un préjudice d'exploitation prouvé.",
    ref: "Régime assurance Homme Clé / CGI",
    diff: "hard"
  },
  {
    id: 40 + 39,
    cat: "is",
    theme: "Amortissements",
    q: "Une société à l'IS achète un ordinateur de 450€ HT pour ses bureaux. Quelle option de traitement s'offre à elle d'après le cours ?",
    multi: false,
    opts: [
      "Elle doit l'amortir de manière linéaire obligatoire sur une durée de 3 ans",
      "Elle peut, d'après les tolérances administratives, déduire directement le montant de 450€ HT des charges de l'exercice (biens de faible valeur < 500€ HT)",
      "Elle doit réintégrer le montant à 100% sans pouvoir le déduire",
      "Elle bénéficie d'un suramortissement d'incitation fiscale automatique de 20%"
    ],
    correct: [1],
    expl: "Les matériels informatiques, de bureau, ou petits outillages de moins de 500€ HT peuvent être passés directement en charges de l'exercice au titre des tolérances administratives pour simplifier les écritures.",
    ref: "Instruction administrative / Seuil de 500€ HT",
    diff: "medium"
  },
  {
    id: 40 + 40,
    cat: "is",
    theme: "Territorialité",
    q: "Selon l'arrêt CE Interhome (2003), à quelle condition une filiale française constitue-t-elle un établissement stable de sa société mère étrangère ?",
    multi: false,
    opts: [
      "Dès qu'elle détient 100% de ses actions ordinaires",
      "Si la filiale agit en tant que représentante dépendante de la société étrangère avec l'exercice d'un pouvoir de l'engager juridiquement par contrat",
      "Uniquement si elle est soumise au taux réduit de 15% d'IS",
      "Seulement si elle se livre à de la publicité commerciale déloyale d'équipement"
    ],
    correct: [1],
    expl: "L'arrêt Interhome de 2003 confirme qu'une filiale n'est pas par sa seule existence un établissement stable, sauf si elle réunit les conditions d'un représentant dépendant disposant du pouvoir régulier d'engager sa société mère.",
    ref: "Arrêt CE, Interhome 2003",
    diff: "hard"
  }
];
