export const ALL_QUESTIONS = [
  // ==========================================
  // ====== DROIT DES SÛRETÉS (DS) - EXAM =====
  // ==========================================
  {
    id: 1,
    cat: "sûretés",
    theme: "Introduction aux Sûretés",
    q: "Quelle est la définition exacte du droit de gage général au regard des articles 2284 et 2285 du Code civil ?",
    multi: false,
    opts: [
      "Le droit d'obtenir la propriété immédiate des biens mobiliers du débiteur en cas de retard",
      "Le droit reconnu à tout créancier de faire saisir tous les biens de son débiteur afin d'obtenir paiement",
      "Le privilège exclusif accordé aux créanciers hypothécaires sur les immeubles",
      "L'obligation légale de souscrire un cautionnement bancaire pour tout prêt pro"
    ],
    correct: [1],
    expl: "Le droit de gage général (Art. 2284 et 2285 cciv) permet à tout créancier de saisir les biens de son débiteur. Cependant, son défaut est l'égalité entre créanciers chirographaires, d'où la règle du 'prix de la course'.",
    ref: "Articles 2284 et 2285 du Code civil",
    diff: "easy"
  },
  {
    id: 2,
    cat: "sûretés",
    theme: "Introduction aux Sûretés",
    q: "Quelles sont les faiblesses majeures du droit de gage général pour un créancier chirographaire ? (Sélectionner 2 réponses)",
    multi: true,
    opts: [
      "Le patrimoine du débiteur peut s'avérer insuffisant pour désintéresser tous les créanciers",
      "Le débiteur peut opposer le bénéfice de discussion de plein droit",
      "Le principe d'égalité (Art. 2285) implique la règle du 'prix de la course'",
      "Les biens saisis sont obligatoirement rachetés par l'État à moitié prix"
    ],
    correct: [0, 2],
    expl: "Le droit de gage général présente deux limites majeures : l'insuffisance possible du patrimoine du débiteur, et la concurrence des autres créanciers chirographaires sous le principe d'égalité (premier saisissant, premier payé).",
    ref: "Article 2285 du Code civil / Cours p.1",
    diff: "medium"
  },
  {
    id: 3,
    cat: "sûretés",
    theme: "Introduction aux Sûretés",
    q: "L'ordonnance du 15 septembre 2021 portant réforme du droit des sûretés :",
    multi: false,
    opts: [
      "S'applique de manière rétroactive à tous les contrats en cours sans exception",
      "Est entrée en vigueur le 1er janvier 2022, les contrats antérieurs restant soumis au droit ancien",
      "A supprimé définitivement le cautionnement solidaire",
      "A interdit l'accès des personnes physiques au cautionnement"
    ],
    correct: [1],
    expl: "L'ordonnance du 15 septembre 2021 est entrée en vigueur le 1er janvier 2022. Les situations nées antérieurement restent soumises aux dispositions du droit ancien pour préserver la sécurité juridique.",
    ref: "Ordonnance du 15 septembre 2021",
    diff: "easy"
  },
  {
    id: 4,
    cat: "sûretés",
    theme: "Introduction aux Sûretés",
    q: "Un Entrepreneur Individuel (EI) sous le régime post-2022 souhaite se porter caution. Quelle est la règle applicable ?",
    multi: false,
    opts: [
      "Il peut se porter caution pour une dette dont il est lui-même débiteur principal",
      "La séparation légale des patrimoines (perso/pro) lui interdit de se porter caution pour une deete dont il est débiteur principal",
      "Il n'engagera que ses biens professionnels s'il n'obtient pas l'accord du tribunal",
      "Le cautionnement est nul si le montant dépasse 10% de son actif net"
    ],
    correct: [1],
    expl: "La réforme de 2022 sépare de plein droit le patrimoine professionnel et personnel de l'EI. Cependant, l'EI ne peut pas se porter caution pour une deete dont il est lui-même débiteur en voulant utiliser son autre patrimoine.",
    ref: "Réforme de l'EI 2022 / Cours p.1",
    diff: "hard"
  },
  {
    id: 5,
    cat: "sûretés",
    theme: "Cautionnement - Formation",
    q: "Quelles conditions de fond sont exigées pour la validité d'un contrat de cautionnement ? (Sélectionner 3 réponses)",
    multi: true,
    opts: [
      "Le consentement libre et éclairé de la caution (sans vice du consentement)",
      "La capacité et le pouvoir de contracter des parties",
      "Un contenu licite et certain de l'obligation de garantie",
      "L'enregistrement obligatoire auprès du service de la publicité foncière"
    ],
    correct: [0, 1, 2],
    expl: "Le cautionnement, en tant que contrat, obéit d'abord aux conditions de fond de droit commun de l'article 1128 du Code civil : consentement, capacité, et contenu licite/certain.",
    ref: "Article 1128 du Code civil",
    diff: "medium"
  },
  {
    id: 6,
    cat: "sûretés",
    theme: "Cautionnement - Formation",
    q: "Le cautionnement consenti par une personne physique à un créancier professionnel doit comporter une mention écrite. Quelle est la règle sous l'article 2297 du Code civil ?",
    multi: false,
    opts: [
      "La mention doit obligatoirement être rédigée de manière manuscrite sous peine de nullité absolue",
      "La mention écrite est requise, mais elle peut être non manuscrite (électronique d'après 1174/1175 cciv)",
      "Aucune mention n'est requise si l'acte est signé devant deux témoins majeurs",
      "La mention est facultative pour les dirigeants de sociétés par actions"
    ],
    correct: [1],
    expl: "Depuis le 1er janvier 2022, l'article 2297 cciv exige une mention écrite par la caution, mais celle-ci n'a plus besoin d'être obligatoirement manuscrite (ouverture aux signatures électroniques sous réserve des articles 1174 et 1175).",
    ref: "Article 2297 du Code civil",
    diff: "hard"
  },
  {
    id: 7,
    cat: "sûretés",
    theme: "Cautionnement - Formation",
    q: "Comment les juges apprécient-ils si une caution est qualifiée de 'caution avertie' au regard du devoir de mise en garde ?",
    multi: false,
    opts: [
      "Uniquement d'après son diplôme de droit ou de comptabilité",
      "En évaluant ses aptitudes à apprécier les risques de l'opération d'après sa formation, son expérience pro et ses liens avec le débiteur",
      "C'est une présomption irréfragable pour toute personne mariée sous le régime de la communauté",
      "Uniquement si elle possède plus de 50% du capital de la banque créancière"
    ],
    correct: [1],
    expl: "L'aptitude de la caution à évaluer les risques d'endettement est appréciée au cas par cas par les juges d'après un faisceau d'indices comprenant sa formation, son expérience professionnelle, et ses liens d'affaires ou familiaux avec le débiteur.",
    ref: "Jurisprudence constante / Cours p.3",
    diff: "medium"
  },
  {
    id: 8,
    cat: "sûretés",
    theme: "Cautionnement - Formation",
    q: "Quelle est la sanction encourue par le créancier professionnel en cas de disproportion manifeste du cautionnement signé par une personne physique après 2022 ?",
    multi: false,
    opts: [
      "La nullité absolue et définitive du contrat de cautionnement",
      "Le cautionnement est réduit au montant que la caution peut raisonnablement garantir",
      "Une amende administrative de 15 000 euros versée au Trésor Public",
      "L'obligation de transformer la créance en don sans contrepartie"
    ],
    correct: [1],
    expl: "L'article 2300 cciv issu de la réforme de 2021 a modifié la sanction : au lieu de la décharge totale de la caution (ancien droit), le cautionnement disproportionné est désormais simplement réduit au montant que la caution peut raisonnablement garantir.",
    ref: "Article 2300 du Code civil",
    diff: "hard"
  },
  {
    id: 9,
    cat: "sûretés",
    theme: "Cautionnement - Formation",
    q: "Un dirigeant de SARL signe un cautionnement au nom de sa société. Ce cautionnement dépasse l'objet social. Quelle est la conséquence ?",
    multi: false,
    opts: [
      "Le cautionnement est automatiquement nul de plein droit",
      "Le dépassement de l'objet social est inopposable aux tiers de bonne foi, le cautionnement reste donc valable pour la société",
      "Le cautionnement est valable mais réduit à 10% du capital social",
      "L'acte est valable uniquement si tous les associés ont signé l'acte de cautionnement individuellement"
    ],
    correct: [1],
    expl: "Dans les SARL et les sociétés par actions, le dépassement de l'objet social par les dirigeants est inopposable aux tiers de bonne foi. La société reste donc engagée par le cautionnement, sauf si elle prouve que le tiers savait que l'acte dépassait l'objet social.",
    ref: "Droit des sociétés / Cours p.3",
    diff: "medium"
  },
  {
    id: 10,
    cat: "sûretés",
    theme: "Cautionnement - Formation",
    q: "Quelles conditions cumulatives caractérisent le manquement au devoir de mise en garde sous l'article 2219 cciv ? (Sélectionner 2 réponses)",
    multi: true,
    opts: [
      "Le créancier est un professionnel et la caution une personne physique (Art. 2219)",
      "La caution doit obligatoirement être un établissement de crédit concurrent",
      "L'engagement est disproportionné aux facultés de la caution ou le crédit est inadapté aux capacités du débiteur",
      "Le prêt doit comporter un taux d'intérêt usuraire d'au moins 12%"
    ],
    correct: [0, 2],
    expl: "Le devoir de mise en garde (Art. 2219 cciv) s'applique aux cautionnements conclus par une personne physique avec un créancier professionnel. Il porte sur l'inadaptation du crédit ou le risque d'endettement excessif.",
    ref: "Article 2219 du Code civil",
    diff: "hard"
  },
  {
    id: 11,
    cat: "sûretés",
    theme: "Cautionnement - Étendue",
    q: "Qu'est-ce que le cautionnement défini ?",
    multi: false,
    opts: [
      "Un cautionnement qui ne couvre que le capital principal de la dette, à l'exclusion des intérêts",
      "Un cautionnement dont la durée est indéterminée et résiliable à tout moment",
      "Un cautionnement garantissant toutes les dettes futures d'une entreprise",
      "Une garantie accordée uniquement par un établissement financier public"
    ],
    correct: [0],
    expl: "Le cautionnement défini couvre seulement le capital de la dette principale, excluant les intérêts de retard ou pénalités, à la différence du cautionnement indéfini (Art. 2296 cciv).",
    ref: "Article 2296 du Code civil",
    diff: "easy"
  },
  {
    id: 12,
    cat: "sûretés",
    theme: "Cautionnement - Étendue",
    q: "Quelle est la différence cruciale entre l'obligation de couverture et l'obligation de règlement ?",
    multi: false,
    opts: [
      "L'obligation de couverture porte sur les dettes présentes, celle de règlement sur les dettes futures",
      "L'obligation de couverture délimite les dettes qui entreront dans la garantie, tandis que l'obligation de règlement impose de payer le créancier à l'échéance",
      "L'obligation de règlement est facultative, celle de couverture est obligatoire",
      "La distinction n'est applicable que dans la garantie autonome"
    ],
    correct: [1],
    expl: "L'obligation de couverture détermine quelles dettes futures intègrent le périmètre de la garantie. L'obligation de règlement est l'obligation de payer le créancier lorsque la deete garantie est exigible et impayée.",
    ref: "Articles 2316 et 2318 du Code civil",
    diff: "medium"
  },
  {
    id: 13,
    cat: "sûretés",
    theme: "Cautionnement - Étendue",
    q: "Dans un cautionnement à durée indéterminée, quelle faculté est offerte à la caution par l'article 1211 du Code civil ?",
    multi: false,
    opts: [
      "Elle peut réduire unilatéralement le montant garanti à tout moment",
      "Elle peut résilier unilatéralement son engagement de couverture pour l'avenir",
      "Elle est libérée rétroactivement de toutes les deetes déjà nées",
      "Elle peut exiger du créancier qu'il renonce aux intérêts de retard"
    ],
    correct: [1],
    expl: "Conformément à l'article 1211 cciv, tout engagement à durée indéterminée peut être résilié unilatéralement. La caution reste tenue des deetes nées avant la résiliation, mais n'en couvre plus de nouvelles.",
    ref: "Article 1211 du Code civil / Cours p.4",
    diff: "medium"
  },
  {
    id: 14,
    cat: "sûretés",
    theme: "Cautionnement - Effets",
    q: "Quelle est la sanction encourue par le créancier professionnel qui omet d'informer annuellement la caution personne physique (Art. 2302 cciv) ?",
    multi: false,
    opts: [
      "La nullité absolue du contrat de cautionnement",
      "La déchéance des intérêts et pénalités de retard échus depuis la précédente information",
      "Une pénalité forfaitaire égale à 50% du capital garanti",
      "La suspension automatique des poursuites contre le débiteur principal"
    ],
    correct: [1],
    expl: "L'article 2302 cciv impose d'informer annuellement la caution du montant restant dû et de la durée. À défaut, le créancier professionnel est déchu du droit aux intérêts et pénalités de retard échus.",
    ref: "Article 2302 du Code civil",
    diff: "hard"
  },
  {
    id: 15,
    cat: "sûretés",
    theme: "Cautionnement - Effets",
    q: "À quel moment le créancier professionnel doit-il informer la caution personne physique de la défaillance du débiteur principal (Art. 2303 cciv) ?",
    multi: false,
    opts: [
      "Uniquement lors du dépôt de bilan du débiteur",
      "Dès le premier incident de paiement non régularisé dans le mois de son exigibilité",
      "Au bout de trois mois consécutifs d'impayés",
      "Seulement lors de la saisine du tribunal judiciaire"
    ],
    correct: [1],
    expl: "L'article 2303 cciv impose au créancier professionnel d'informer la caution de tout incident de paiement non régularisé dès le premier incident, sous peine de déchéance des intérêts et pénalités de retard.",
    ref: "Article 2303 du Code civil",
    diff: "hard"
  },
  {
    id: 16,
    cat: "sûretés",
    theme: "Cautionnement - Recours & Extinction",
    q: "Quelles sont les caractéristiques du recours personnel de la caution après paiement ? (Sélectionner 2 réponses)",
    multi: true,
    opts: [
      "Il s'agit d'un droit propre né du paiement, fondé sur un droit nouveau (Art. 2308 cciv)",
      "Le débiteur peut lui opposer toutes les exceptions qu'il avait contre le créancier d'origine",
      "Le débiteur ne peut pas lui opposer les litiges qu'il avait avec le créancier d'origine",
      "Il s'éteint automatiquement si le débiteur est une personne morale"
    ],
    correct: [0, 2],
    expl: "Le recours personnel (Art. 2308 cciv) crée un droit propre et nouveau pour la caution. Puisqu'elle n'agit pas au nom du créancier, le débiteur ne peut pas lui opposer les exceptions issues du contrat de base.",
    ref: "Article 2308 du Code civil",
    diff: "hard"
  },
  {
    id: 17,
    cat: "sûretés",
    theme: "Cautionnement - Recours & Extinction",
    q: "Qu'est-ce que le recours subrogatoire de la caution après paiement (Art. 2309 cciv) ?",
    multi: false,
    opts: [
      "Un recours permettant de doubler le montant exigible auprès du débiteur",
      "La transmission à la caution des droits, privilèges et sûretés du créancier d'origine, mais soumise aux exceptions opposables",
      "Un recours devant le tribunal administratif pour faute de l'État",
      "Une action en annulation de la deete principale"
    ],
    correct: [1],
    expl: "Le recours subrogatoire (Art. 2309 cciv) permet à la caution d'exercer les droits du créancier. Elle bénéficie de ses sûretés et privilèges, mais le débiteur peut lui opposer toutes les exceptions qu'il avait contre le créancier.",
    ref: "Article 2309 du Code civil",
    diff: "medium"
  },
  {
    id: 18,
    cat: "sûretés",
    theme: "Cautionnement - Recours & Extinction",
    q: "En cas de cofidéjusseurs (plusieurs cautions d'une même deete), qu'est-ce que le bénéfice de division (Art. 2306 cciv) ?",
    multi: false,
    opts: [
      "Le droit de diviser les biens du débiteur principal",
      "Le droit pour la caution poursuivie d'obliger le créancier à diviser ses poursuites entre toutes les cautions solvables",
      "La réduction de la deete principale au prorata des cautions",
      "L'annulation du cautionnement s'il y a plus de trois garanties"
    ],
    correct: [1],
    expl: "Le bénéfice de division permet à une caution poursuivie d'obliger le créancier à diviser sa demande entre les différentes cautions solvables, de sorte qu'elle ne paie que sa part.",
    ref: "Article 2306 du Code civil",
    diff: "medium"
  },
  {
    id: 19,
    cat: "sûretés",
    theme: "Garantie Autonome",
    q: "Au regard de l'article 2321 cciv, quel critère caractérise l'indépendance de la Garantie Autonome ? (Sélectionner 2 réponses)",
    multi: true,
    opts: [
      "Le garant ne peut opposer aucune exception tirée du contrat de base",
      "Le garant doit payer sur simple demande indépendamment du contrat principal",
      "La garantie est automatiquement transmise avec la créance d'origine",
      "Le montant garanti doit être inférieur à la moitié de la deete"
    ],
    correct: [0, 1],
    expl: "La Garantie Autonome (Art. 2321 cciv) se caractérise par son indépendance complète. Le garant s'oblige à payer sur simple demande et ne peut soulever aucune exception liée au contrat principal.",
    ref: "Article 2321 du Code civil",
    diff: "hard"
  },
  {
    id: 20,
    cat: "sûretés",
    theme: "Garantie Autonome",
    q: "Quelles sont les trois modalités possibles d'appel d'une Garantie Autonome ?",
    multi: false,
    opts: [
      "Appel unilatéral, appel contradictoire, appel judiciaire",
      "Garantie à première demande, garantie documentaire, garantie justifiée",
      "Appel par lettre, appel par huissier, appel par virement",
      "La loi n'autorise que l'appel écrit de nature notariale"
    ],
    correct: [1],
    expl: "Il existe 3 modalités d'appel : la garantie à première demande (sans justificatif), la garantie documentaire (sur présentation de pièces), et la garantie justifiée (le créancier énonce les motifs de l'appel).",
    ref: "Cours p.9 / Pratique des affaires",
    diff: "medium"
  },
  {
    id: 21,
    cat: "sûretés",
    theme: "Lettre d'intention",
    q: "La leetre d'intention (confortant/garant) régie par l'article 2322 du Code civil :",
    multi: false,
    opts: [
      "Ne crée qu'un simple engagement moral sans valeur juridique",
      "Est un engagement de soutien qui peut être une obligation de moyens ou de résultat selon sa rédaction",
      "Est un contrat synallagmatique exigeant un acte notarié",
      "S'éteint obligatoirement au bout de 12 mois d'activité"
    ],
    correct: [1],
    expl: "L'article 2322 cciv définit la leetre d'intention comme un engagement de soutien. Si la leetre s'engage à 'veiller à ce que le débiteur puisse faire face', c'est de moyens ; si elle garantit un paiement, c'est de résultat.",
    ref: "Article 2322 du Code civil",
    diff: "medium"
  },
  {
    id: 22,
    cat: "sûretés",
    theme: "Lettre d'intention",
    q: "Quelle est la conséquence si le confortant manque à son obligation de résultat dans une leetre d'intention ?",
    multi: false,
    opts: [
      "Le créancier ne peut exiger qu'une amende de 10% de la deete",
      "Le seul fait que le débiteur ne paie pas sa deete établit le manquement du confortant, ouvrant droit à indemnisation (DI)",
      "L'acte est requalifié d'office en donation simple",
      "La leetre d'intention s'annule rétroactivement"
    ],
    correct: [1],
    expl: "Dans une obligation de résultat liée à une leetre d'intention, le défaut de paiement du débiteur suffit à prouver la faute du confortant, engageant sa responsabilité civile contractuelle pour l'octroi de dommages et intérêts.",
    ref: "Article 2322 du Code civil / Cours p.10",
    diff: "hard"
  },
  {
    id: 23,
    cat: "sûretés",
    theme: "Sûretés réelles - Exclusives",
    q: "Comment fonctionne la clause de réserve de propriété (CRP) régie par l'article 2367 cciv ?",
    multi: false,
    opts: [
      "Elle transfère la propriété du bien dès la signature, mais interdit sa revente pendant 1 an",
      "Elle suspend le transfert de propriété d'un bien jusqu'à l'entier paiement du prix par l'acheteur",
      "Elle permet à l'acheteur d'annuler la vente s'il trouve un prix inférieur ailleurs",
      "Elle requiert une publication mensuelle au Journal Officiel"
    ],
    correct: [1],
    expl: "La CRP (Art. 2367 cciv) suspend le transfert de propriété d'un bien. En cas d'impayé, le vendeur peut exiger la restitution physique du bien, sa valeur venant s'imputer sur la deete.",
    ref: "Article 2367 du Code civil",
    diff: "easy"
  },
  {
    id: 24,
    cat: "sûretés",
    theme: "Sûretés réelles - Exclusives",
    q: "Dans le cadre de la fiducie-sûreté (Art. 2011 et 2372-1 cciv), quels sont les trois acteurs impliqués ? (Sélectionner 3 réponses)",
    multi: true,
    opts: [
      "Le constituant (qui transfère temporairement le bien garanti)",
      "Le fiduciaire (qui reçoit et gère juridiquement le bien transféré)",
      "Le bénéficiaire (qui profite de la garantie, souvent le créancier)",
      "Le liquidateur amiable de la Banque de France"
    ],
    correct: [0, 1, 2],
    expl: "La fiducie-sûreté est une opération tripartite : le constituant (débiteur) transfère la propriété d'un bien à un fiduciaire (banque/avocat) au profit d'un bénéficiaire (créancier).",
    ref: "Articles 2011 et 2372-1 du Code civil",
    diff: "medium"
  },
  {
    id: 25,
    cat: "sûretés",
    theme: "Sûretés réelles - Exclusives",
    q: "Quelles conditions cumulatives fondent le droit de rétention sous l'article 2286 du Code civil ?",
    multi: false,
    opts: [
      "Une deete supérieure à 15 000 euros et un acte notarié",
      "Une détention matérielle de la chose et une connexité (lien entre la créance et la détention)",
      "Une publication au greffe et l'insolvabilité du débiteur",
      "Le consentement écrit du conjoint survivant"
    ],
    correct: [1],
    expl: "Le droit de rétention exige une détention effective et licite du bien (meuble ou immeuble) et un lien de connexité (juridique, matérielle ou conventionnelle) entre le bien détenu et la créance impayée.",
    ref: "Article 2286 du Code civil",
    diff: "medium"
  },
  {
    id: 26,
    cat: "sûretés",
    theme: "Sûretés réelles - Préférentielles",
    q: "Selon l'article 2333 du Code civil, sur quoi porte exactement le gage ?",
    multi: false,
    opts: [
      "Uniquement sur les créances et brevets d'invention",
      "Sur un bien meuble corporel (ou un ensemble de meubles corporels) affecté en garantie",
      "Uniquement sur les immeubles à usage professionnel",
      "Sur l'ensemble du patrimoine immobilier futur du débiteur"
    ],
    correct: [1],
    expl: "Le gage (Art. 2333 cciv) est une sûreté réelle mobilière portant sur un bien meuble corporel (ou un ensemble de biens) affecté en garantie d'une obligation.",
    ref: "Article 2333 du Code civil",
    diff: "easy"
  },
  {
    id: 27,
    cat: "sûretés",
    theme: "Sûretés réelles - Préférentielles",
    q: "Comment s'établit l'opposabilité d'un gage d'après l'article 2337 du Code civil ? (Sélectionner 2 réponses)",
    multi: true,
    opts: [
      "Par la publicité (sans dépossession), via l'inscription sur un registre spécial",
      "Par la dépossession effective du bien entre les mains du créancier ou d'un tiers",
      "Par simple échange d'e-mails entre les contractants",
      "Par publication d'un encart dans un journal d'annonces légales"
    ],
    correct: [0, 1],
    expl: "L'opposabilité du gage s'établit soit par la publicité (inscription sur un registre public national, le débiteur conservant l'usage du bien), soit par la dépossession (remise matérielle du bien au créancier ou à un gardien).",
    ref: "Article 2337 du Code civil",
    diff: "medium"
  },
  {
    id: 28,
    cat: "sûretés",
    theme: "Sûretés réelles - Préférentielles",
    q: "Qu'est-ce que le nantissement d'après l'article 2355 du Code civil ?",
    multi: false,
    opts: [
      "Une sûreté réelle immobilière portant sur les résidences principales",
      "L'affectation en garantie d'une obligation d'un bien meuble incorporel",
      "Le blocage forcé des dividendes des associés majoritaires",
      "Un cautionnement bancaire sans plafond de ressources"
    ],
    correct: [1],
    expl: "Le nantissement est le pendant du gage pour les biens incorporels (créances, comptes-titres, parts sociales, fonds de commerce). Il est défini par l'article 2355 cciv.",
    ref: "Article 2355 du Code civil",
    diff: "easy"
  },
  {
    id: 29,
    cat: "sûretés",
    theme: "Sûretés réelles - Préférentielles",
    q: "Quelles conditions de forme sont requises pour la validité d'un nantissement de créance ? (Sélectionner 2 réponses)",
    multi: true,
    opts: [
      "La rédaction obligatoire d'un écrit sous peine de nullité (Art. 2356 cciv)",
      "L'acte doit permettre d'identifier la créance garantie et la créance nantie",
      "Un dépôt physique des contrats de créance au tribunal",
      "L'approbation du greffier en chef d'office"
    ],
    correct: [0, 1],
    expl: "Le nantissement de créance exige un écrit à peine de nullité. Cet acte écrit doit obligatoirement identifier clairement la créance garantie d'une part, et la créance nantie d'autre part (Art. 2356).",
    ref: "Article 2356 du Code civil",
    diff: "hard"
  },
  {
    id: 30,
    cat: "sûretés",
    theme: "Sûretés réelles - Préférentielles",
    q: "Pour être opposable au débiteur de la créance nantie, le nantissement doit (Art. 2362 cciv) :",
    multi: false,
    opts: [
      "Faire l'objet d'une publication au Journal Officiel",
      "Lui être notifié ou il doit intervenir directement à l'acte, sinon il peut valablement payer le constituant",
      "Être enregistré devant notaire obligatoirement",
      "Être visé par un commissaire aux comptes extérieur"
    ],
    correct: [1],
    expl: "Selon l'article 2362 cciv, à défaut de notification ou d'intervention à l'acte, le nantissement de créance n'est pas opposable au débiteur cédé/nanti qui peut alors valablement se libérer entre les mains du créancier d'origine.",
    ref: "Article 2362 du Code civil",
    diff: "hard"
  },
  {
    id: 31,
    cat: "sûretés",
    theme: "Cautionnement - Effets",
    q: "Dans quel cas la caution personne physique peut-elle invoquer de plein droit la déchéance des intérêts du créancier professionnel ? (Sélectionner 2 réponses)",
    multi: true,
    opts: [
      "Le créancier n'a pas fourni l'information annuelle du montant restant dû avant le 31 mars (Art. 2302 cciv)",
      "Le créancier n'a pas informé la caution du premier incident de paiement sous un mois (Art. 2303 cciv)",
      "Le débiteur principal a obtenu un délai de grâce du juge",
      "La caution a déménagé à l'étranger sans prévenir la banque"
    ],
    correct: [0, 1],
    expl: "L'article 2302 (information annuelle) et l'article 2303 (information du premier incident) prévoient la déchéance des intérêts et pénalités de retard à l'encontre du créancier professionnel en cas de défaut d'information de la caution.",
    ref: "Articles 2302 et 2303 du Code civil",
    diff: "hard"
  },
  {
    id: 32,
    cat: "sûretés",
    theme: "Sûretés réelles - Exclusives",
    q: "Dans un crédit-bail mobilier, qui conserve la propriété du matériel durant toute la période de location ?",
    multi: false,
    opts: [
      "Le crédit-preneur (l'entreprise utilisatrice)",
      "Le crédit-bailleur (l'établissement de crédit propriétaire)",
      "Le fabricant du matériel d'origine",
      "L'administration des douanes"
    ],
    correct: [1],
    expl: "Le crédit-bailleur (la banque/société financière) reste propriétaire légal du bien durant toute la durée du contrat. Le crédit-preneur n'est que locataire avec option d'achat en fin de contrat.",
    ref: "Régime du crédit-bail / Cours p.11",
    diff: "easy"
  },
  {
    id: 33,
    cat: "sûretés",
    theme: "Sûretés réelles - Exclusives",
    q: "Quelle est la formalité indispensable exigée par l'article 2372-2 cciv pour la validité du contrat de fiducie-sûreté ?",
    multi: false,
    opts: [
      "Un accord verbal validé par deux commissaires de justice",
      "Un écrit à peine de nullité identifiant les biens transférés, la deete garantie et les pouvoirs du fiduciaire",
      "Une publication dans un journal d'annonces légales sous 48 heures",
      "Le visa obligatoire du procureur de la République"
    ],
    correct: [1],
    expl: "Le contrat de fiducie-sûreté doit impérativement être rédigé par écrit à peine de nullité, en identifiant précisément les biens, les créances et les limites des pouvoirs conférés au fiduciaire.",
    ref: "Article 2372-2 du Code civil / Cours p.12",
    diff: "hard"
  },
  {
    id: 34,
    cat: "sûretés",
    theme: "Sûretés réelles - Préférentielles",
    q: "Qu'est-ce que le pacte commissoire conventionnel dans le cadre d'un gage ?",
    multi: false,
    opts: [
      "Une clause interdisant les saisies sur les comptes de la caution",
      "Une clause prévoyant que la défaillance du débiteur entraînera l'appropriation automatique du bien gagé par le créancier",
      "Un pacte de non-agression commerciale entre créanciers chirographaires",
      "Une obligation de vendre le bien aux enchères sans passer par un expert"
    ],
    correct: [1],
    expl: "Le pacte commissoire (Art. 2348 cciv) est une clause contractuelle autorisant le créancier à devenir propriétaire du bien gagé dès la défaillance du débiteur, après évaluation par expert pour éviter tout enrichissement injustifié.",
    ref: "Article 2348 du Code civil",
    diff: "medium"
  },
  {
    id: 35,
    cat: "sûretés",
    theme: "Cautionnement - Recours & Extinction",
    q: "L'extinction par voie accessoire du cautionnement se produit lorsque :",
    multi: false,
    opts: [
      "La caution décède sans héritier majeur",
      "La deete principale garantie s'éteint (paiement complet, remise de deete, compensation, prescription)",
      "Le créancier professionnel fusionne avec une autre banque",
      "Le débiteur principal est déclaré en liquidation judiciaire"
    ],
    correct: [1],
    expl: "Le cautionnement étant un contrat accessoire, l'extinction de la deete principale (par paiement, remise de deete, prescription) libère automatiquement la caution (voie accessoire).",
    ref: "Article 2298 du Code civil / Extinction",
    diff: "easy"
  },
  {
    id: 36,
    cat: "sûretés",
    theme: "Garantie Autonome",
    q: "La Garantie Autonome (GA) se transmet-elle automatiquement avec la créance d'origine du créancier ?",
    multi: false,
    opts: [
      "Oui, en tant qu'accessoire de la créance d'origine",
      "Non, car elle est attachée personnellement à la personne du bénéficiaire désigné d'origine",
      "Uniquement s'il s'agit d'un crédit à la consommation",
      "Seulement si l'acte est notarié d'office"
    ],
    correct: [1],
    expl: "L'inopposabilité et l'indépendance de la GA (Art. 2321 cciv) impliquent qu'elle est attachée à la personne du bénéficiaire et ne se transmet pas automatiquement avec la créance (contrairement au cautionnement).",
    ref: "Article 2321 du Code civil / Transfert",
    diff: "hard"
  },
  {
    id: 37,
    cat: "sûretés",
    theme: "Sûretés réelles - Exclusives",
    q: "Qu'est-ce que la cession de créance professionnelle simplifiée (Cession Dailly) ?",
    multi: false,
    opts: [
      "Un transfert amiable de propriété immobilière",
      "La transmission d'une créance à une banque par simple bordereau, réservée aux professionnels d'après la loi",
      "Un cautionnement accordé d'office par l'État aux PME",
      "La résiliation forcée d'un crédit immobilier"
    ],
    correct: [1],
    expl: "La Cession Dailly est un mécanisme permettant à un professionnel de céder ses créances commerciales à un établissement de crédit par la seule remise d'un bordereau normé.",
    ref: "Code monétaire et financier / Dailly",
    diff: "medium"
  },
  {
    id: 38,
    cat: "sûretés",
    theme: "Introduction aux Sûretés",
    q: "L'attribution judiciaire du bien gagé (Art. 2347 cciv) exige-t-elle le recours obligatoire à un expert ?",
    multi: false,
    opts: [
      "Non, le créancier fixe lui-même la valeur du bien",
      "Oui, le bien doit être évalué objectivement par expert ou d'après une cotation officielle (Art. 2348)",
      "Uniquement si le débiteur est un particulier en sauvegarde",
      "Seulement si le bien a été acheté à l'étranger"
    ],
    correct: [1],
    expl: "Pour éviter la spoliation du débiteur, toute appropriation du bien gagé (judiciaire ou via pacte commissoire) impose une évaluation impartiale par expert désigné à l'amiable ou en justice.",
    ref: "Article 2348 du Code civil",
    diff: "hard"
  },
  {
    id: 39,
    cat: "sûretés",
    theme: "Sûretés réelles - Préférentielles",
    q: "Le nantissement de compte-titres porte sur (Art. 2355 cciv) :",
    multi: false,
    opts: [
      "Uniquement sur les dividendes en espèces",
      "Les instruments financiers inscrits sur un compte d'affectation (actions, obligations)",
      "L'ensemble du matériel de production de la société",
      "Un immeuble professionnel de bureaux"
    ],
    correct: [1],
    expl: "Le nantissement de compte-titres (Art. 2355 cciv) a pour assiette les instruments financiers (parts, actions, obligations) enregistrés sur un compte d'affectation spécifique.",
    ref: "Article 2355 du Code civil / CT",
    diff: "medium"
  },
  {
    id: 40,
    cat: "sûretés",
    theme: "Sûretés réelles - Préférentielles",
    q: "Dans un nantissement de fonds de commerce conventionnel, quels éléments sont inclus par défaut à défaut de précision expresse ?",
    multi: false,
    opts: [
      "Uniquement le stock de marchandises et les dettes",
      "L'enseigne, le nom commercial, la clientèle et le droit au bail (Art. 2355)",
      "Le bâtiment industriel et le terrain",
      "Le compte courant de trésorerie de la société"
    ],
    correct: [1],
    expl: "À défaut de désignation claire dans le contrat écrit, la loi limite l'assiette du nantissement de fonds de commerce aux éléments incorporels indispensables : enseigne, nom, clientèle, et droit au bail.",
    ref: "Code de commerce / Assiette nantissement",
    diff: "hard"
  },

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
