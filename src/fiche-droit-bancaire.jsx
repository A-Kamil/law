import React, { useState, useEffect, useMemo, useRef, useContext, createContext } from "react";
import { BookOpen, ChevronRight, ChevronDown, Check, Circle, Search, Menu, X, ArrowLeft, ArrowRight, Bookmark, BookmarkCheck, FileText, Edit3, Save, Eye, EyeOff, Target, Scale } from "lucide-react";

// ============================================================
// PALETTE — Night Court (Velaris) — inspirée d'ACOTAR
// ============================================================
const C = {
  bg:        "#0E1730",   // ciel de minuit
  paper:     "#162241",   // surface page
  ink:       "#E8DDC9",   // parchemin lumineux
  inkSoft:   "#A8A7B8",   // lavande sourdine
  navy:      "#9D87E0",   // améthyste — titres
  navyDark:  "#7B5BAB",
  burgundy:  "#D77295",   // rose féerique — accents
  gold:      "#F4D88C",   // étoile — jurisprudences
  forest:    "#7BC4A8",   // écaille de dragon — position du prof
  rule:      "#3A4870",   // filets
  ruleSoft:  "#26314F",
  highlight: "#1F2C50",   // pépites — surface relevée
  encadre:   "#1A2542",
  encadrePos:"#1B3A2E",
  encadreInfo:"#1F2D55",
};

// ============================================================
// MODÈLE DE CONFIANCE — source de vérité unique
// ============================================================
const CONFIDENCE = {
  red: {
    label: "Pas acquis",
    short: "Pas acquis",
    description: "Je ne saurais pas le restituer à l'oral.",
    color: C.burgundy,
    bg: "#3D1F2A",
    emoji: "🔴",
  },
  yellow: {
    label: "À revoir",
    short: "À revoir",
    description: "Je connais l'idée, mais sans solidité.",
    color: C.gold,
    bg: "#3A2E1F",
    emoji: "🟡",
  },
  green: {
    label: "Maîtrisé",
    short: "Maîtrisé",
    description: "Je peux le restituer à l'oral, sans hésiter.",
    color: C.forest,
    bg: "#1F3530",
    emoji: "🟢",
  },
};

// ============================================================
// CONTEXT — Mode masqué (cloze deletion)
// ============================================================
const MaskedModeContext = createContext({ pepites: false, cas: false });

// ============================================================
// CONTEXT — Helpers de progression (setConfidence, getConfidence)
// ============================================================
const ProgressContext = createContext({
  setConfidence: () => {},
  getConfidence: () => null,
});

// ============================================================
// RÉPÉTITION ESPACÉE — algorithme additif simple (Leitner-light)
// ============================================================
const computeNextDue = (level, reviewCount) => {
  const baseDays = { red: 1, yellow: 3, green: 7 }[level];
  let days = baseDays;
  if (level === "green" && reviewCount > 1) {
    const multiplier = Math.pow(2, Math.floor((reviewCount - 1) / 2));
    days = baseDays * multiplier;
    days = Math.min(days, 90);
  }
  const next = new Date();
  next.setDate(next.getDate() + days);
  next.setHours(0, 0, 0, 0);
  return next.toISOString();
};

// ============================================================
// ENRICHISSEMENT TYPOGRAPHIQUE
// ============================================================
const Term  = ({ children }) => <strong style={{ color: C.burgundy }}>{children}</strong>;
const Art   = ({ children }) => <strong style={{ color: C.navy }}>{children}</strong>;
const Em    = ({ children }) => <em>{children}</em>;
const Strong= ({ children }) => <strong>{children}</strong>;

const Cas = ({ children }) => {
  const { cas: masked } = useContext(MaskedModeContext);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (!masked) setRevealed(false);
  }, [masked]);

  if (!masked || revealed) {
    return (
      <em
        style={{
          color: C.gold,
          fontStyle: "italic",
          cursor: masked ? "pointer" : "default",
        }}
        onClick={() => masked && setRevealed(false)}
        title={masked ? "Cliquer pour masquer à nouveau" : undefined}
      >
        {children}
      </em>
    );
  }

  return (
    <span
      onClick={() => setRevealed(true)}
      style={{
        backgroundColor: C.gold,
        color: "transparent",
        cursor: "pointer",
        padding: "0 6px",
        borderRadius: 2,
        userSelect: "none",
        transition: "background 0.15s",
        display: "inline-block",
        minWidth: "5em",
        textAlign: "center",
        fontStyle: "italic",
      }}
      onMouseEnter={e => e.currentTarget.style.backgroundColor = "#FFEAB8"}
      onMouseLeave={e => e.currentTarget.style.backgroundColor = C.gold}
      title="Cliquer pour révéler l'arrêt"
    >
      {children}
    </span>
  );
};

// ============================================================
// COMPOSANTS DE BLOC
// ============================================================
const P = ({ children, drop }) => (
  <p style={{
    fontFamily: "'EB Garamond', Georgia, serif",
    fontSize: 18,
    lineHeight: 1.7,
    color: C.ink,
    textAlign: "justify",
    hyphens: "auto",
    marginBottom: 16,
  }}>
    {drop && <span style={{
      float: "left",
      fontFamily: "'Fraunces', serif",
      fontWeight: 700,
      fontSize: 56,
      lineHeight: 0.9,
      color: C.burgundy,
      paddingRight: 8,
      paddingTop: 4,
    }}>{drop}</span>}
    {children}
  </p>
);

const H = ({ level, children, style }) => {
  const sizes = { 1: 38, 2: 30, 3: 22, 4: 18 };
  const colors = { 1: C.navy, 2: C.navy, 3: C.burgundy, 4: C.gold };
  const Tag = `h${level}`;
  return (
    <Tag style={{
      fontFamily: "'Fraunces', serif",
      fontWeight: level <= 2 ? 600 : 600,
      fontSize: sizes[level],
      color: colors[level],
      letterSpacing: level === 1 ? "-0.01em" : "0",
      marginTop: level === 1 ? 0 : level === 2 ? 32 : 24,
      marginBottom: level === 1 ? 8 : 14,
      lineHeight: 1.2,
      fontStyle: level === 4 ? "italic" : "normal",
      ...style,
    }}>{children}</Tag>
  );
};

const Callout = ({ children, kind = "prof", title }) => {
  const palette = {
    prof: { bg: C.encadrePos, border: C.forest, badge: "Position du professeur", badgeColor: C.forest },
    info: { bg: C.encadreInfo, border: C.navy, badge: title || "À retenir", badgeColor: C.navy },
    warn: { bg: C.encadre, border: C.burgundy, badge: title || "Attention", badgeColor: C.burgundy },
    tension: { bg: "#2A2645", border: C.gold, badge: title || "Tension fondamentale", badgeColor: C.gold },
  };
  const p = palette[kind];
  return (
    <div style={{
      backgroundColor: p.bg,
      borderLeft: `4px solid ${p.border}`,
      padding: "16px 20px",
      marginBottom: 18,
      marginTop: 8,
      borderRadius: 2,
    }}>
      <div style={{
        fontFamily: "'Manrope', sans-serif",
        fontSize: 11,
        textTransform: "uppercase",
        letterSpacing: "0.12em",
        color: p.badgeColor,
        fontWeight: 700,
        marginBottom: 8,
      }}>{p.badge}</div>
      <div style={{
        fontFamily: "'EB Garamond', Georgia, serif",
        fontSize: 17,
        lineHeight: 1.65,
        color: C.ink,
        textAlign: "justify",
      }}>{children}</div>
    </div>
  );
};

const Mask = ({ children }) => {
  const { pepites: masked } = useContext(MaskedModeContext);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (!masked) setRevealed(false);
  }, [masked]);

  if (!masked || revealed) {
    return (
      <strong
        style={{ color: C.navy, cursor: masked ? "pointer" : "default" }}
        onClick={() => masked && setRevealed(false)}
        title={masked ? "Cliquer pour masquer à nouveau" : undefined}
      >
        {children}
      </strong>
    );
  }

  return (
    <span
      onClick={() => setRevealed(true)}
      style={{
        backgroundColor: C.ink,
        color: "transparent",
        cursor: "pointer",
        padding: "0 6px",
        borderRadius: 2,
        userSelect: "none",
        transition: "background 0.15s",
        display: "inline-block",
        minWidth: "3em",
        textAlign: "center",
      }}
      onMouseEnter={e => e.currentTarget.style.backgroundColor = C.inkSoft}
      onMouseLeave={e => e.currentTarget.style.backgroundColor = C.ink}
      title="Cliquer pour révéler"
    >
      {children}
    </span>
  );
};

const Pepites = ({ items, variant = "default", sectionId }) => {
  const { setConfidence } = useContext(ProgressContext);
  const globalMask = useContext(MaskedModeContext);
  const [testMode, setTestMode] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const isBoussole = variant === "boussole";
  const accent = isBoussole ? C.navy : C.burgundy;
  const badge = isBoussole ? "Boussole — à garder en tête" : "L'essentiel — pépites testables";
  const showTestButton = !!sectionId && !isBoussole;

  useEffect(() => {
    if (!sectionId || isBoussole) return;
    const handler = (e) => {
      if (e.detail?.sectionId === sectionId) setTestMode(true);
    };
    window.addEventListener("pepites:test", handler);
    return () => window.removeEventListener("pepites:test", handler);
  }, [sectionId, isBoussole]);

  const handleScore = (level) => {
    setConfidence(sectionId, level);
    setFeedback(level);
    setTimeout(() => {
      setTestMode(false);
      setFeedback(null);
    }, 1800);
  };

  return (
    <div style={{
      backgroundColor: testMode ? C.paper : C.highlight,
      borderLeft: `4px solid ${accent}`,
      padding: "18px 22px",
      marginBottom: 24,
      borderRadius: 2,
      transition: "background 0.2s",
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12, gap: 12 }}>
        <div style={{
          fontFamily: "'Manrope', sans-serif",
          fontSize: 11,
          textTransform: "uppercase",
          letterSpacing: "0.12em",
          color: accent,
          fontWeight: 700,
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}>
          <Target size={14} strokeWidth={2}/>
          {testMode ? "Test de restitution" : badge}
        </div>

        {showTestButton && !feedback && (
          <button
            onClick={() => setTestMode(t => !t)}
            style={{
              background: "transparent",
              border: `1px solid ${accent}`,
              borderRadius: 4,
              padding: "5px 12px",
              cursor: "pointer",
              fontSize: 11,
              fontWeight: 600,
              color: accent,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              fontFamily: "inherit",
            }}
          >
            {testMode ? "← Quitter" : "📝 Me tester"}
          </button>
        )}
      </div>

      {testMode && !feedback && (
        <div style={{
          fontFamily: "'EB Garamond', serif",
          fontStyle: "italic",
          fontSize: 14,
          color: C.inkSoft,
          marginBottom: 14,
          paddingBottom: 12,
          borderBottom: `1px solid ${C.ruleSoft}`,
        }}>
          Pour chaque pépite, restitue mentalement le contenu masqué AVANT de cliquer pour révéler.
        </div>
      )}

      {!feedback && (
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {items.map((item, i) => (
            <li key={i} style={{
              position: "relative",
              paddingLeft: 22,
              marginBottom: 10,
              fontFamily: "'EB Garamond', Georgia, serif",
              fontSize: 17,
              lineHeight: 1.55,
              color: C.ink,
            }}>
              <span style={{
                position: "absolute",
                left: 2,
                top: 2,
                color: accent,
                fontSize: 14,
              }}>◆</span>
              {testMode
                ? <MaskedModeContext.Provider value={{ pepites: true, cas: globalMask.cas }}>{item}</MaskedModeContext.Provider>
                : item}
            </li>
          ))}
        </ul>
      )}

      {testMode && !feedback && (
        <div style={{
          marginTop: 16,
          paddingTop: 14,
          borderTop: `1px solid ${C.ruleSoft}`,
        }}>
          <div style={{
            fontFamily: "'Manrope', sans-serif",
            fontSize: 11,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: C.inkSoft,
            fontWeight: 600,
            marginBottom: 10,
          }}>
            Comment t'es-tu senti ?
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {(["red", "yellow", "green"]).map(level => (
              <button
                key={level}
                onClick={() => handleScore(level)}
                style={{
                  flex: 1,
                  padding: "10px 12px",
                  background: C.paper,
                  border: `1px solid ${CONFIDENCE[level].color}`,
                  borderRadius: 4,
                  cursor: "pointer",
                  fontFamily: "inherit",
                  fontSize: 12,
                  fontWeight: 600,
                  color: CONFIDENCE[level].color,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 6,
                  transition: "all 0.15s",
                }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = CONFIDENCE[level].bg}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = C.paper}
              >
                <span style={{
                  width: 10, height: 10, borderRadius: "50%",
                  backgroundColor: CONFIDENCE[level].color,
                }}/>
                {{
                  red: "Beaucoup raté",
                  yellow: "Quelques erreurs",
                  green: "Tout juste",
                }[level]}
              </button>
            ))}
          </div>
        </div>
      )}

      {feedback && (
        <div style={{
          padding: "20px 0",
          textAlign: "center",
          fontFamily: "'EB Garamond', serif",
          fontSize: 18,
          color: CONFIDENCE[feedback].color,
          fontStyle: "italic",
        }}>
          ✓ Confidence enregistrée : <strong>{CONFIDENCE[feedback].emoji} {CONFIDENCE[feedback].label}</strong>
        </div>
      )}
    </div>
  );
};

const DataTable = ({ headers, rows }) => (
  <div style={{ marginTop: 8, marginBottom: 20, overflowX: "auto" }}>
    <table style={{
      width: "100%",
      borderCollapse: "collapse",
      fontFamily: "'EB Garamond', Georgia, serif",
      fontSize: 16,
    }}>
      <thead>
        <tr>
          {headers.map((h, i) => (
            <th key={i} style={{
              backgroundColor: C.navy,
              color: C.paper,
              fontFamily: "'Manrope', sans-serif",
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              padding: "10px 14px",
              textAlign: "left",
              borderRight: i < headers.length - 1 ? `1px solid ${C.navyDark}` : "none",
            }}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i} style={{ backgroundColor: i % 2 === 0 ? C.paper : C.encadre }}>
            {row.map((cell, j) => (
              <td key={j} style={{
                padding: "10px 14px",
                borderTop: `1px solid ${C.ruleSoft}`,
                borderRight: j < row.length - 1 ? `1px solid ${C.ruleSoft}` : "none",
                verticalAlign: "top",
                lineHeight: 1.55,
                color: C.ink,
              }}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// ============================================================
// CONTENU — SECTIONS DE LA FICHE
// ============================================================

const TOC = [
  { id: "intro", title: "Synthèse — Introduction & Titre 1", group: "Avant-propos", level: 1 },
  { id: "t2-intro", title: "Titre 2 — Les opérations", group: "Avant-propos", level: 1 },

  // Sous-titre 1
  { id: "ch1-i",   title: "I. Le droit au compte", group: "Ch. 1 — L'ouverture du compte", level: 2 },
  { id: "ch1-ii",  title: "II. Les contrôles à l'ouverture", group: "Ch. 1 — L'ouverture du compte", level: 2 },
  { id: "ch1-iii", title: "III. La convention de compte", group: "Ch. 1 — L'ouverture du compte", level: 2 },
  { id: "ch1-iv",  title: "IV. Les tarifs bancaires", group: "Ch. 1 — L'ouverture du compte", level: 2 },
  { id: "ch1-v",   title: "V. Le devoir d'information", group: "Ch. 1 — L'ouverture du compte", level: 2 },

  { id: "ch2-intro", title: "Nature juridique & garanties", group: "Ch. 2 — Le compte de dépôt", level: 2 },
  { id: "ch2-i",   title: "I. Caractéristiques générales", group: "Ch. 2 — Le compte de dépôt", level: 2 },
  { id: "ch2-ii",  title: "II. Titulaires multiples", group: "Ch. 2 — Le compte de dépôt", level: 2 },
  { id: "ch2-iii", title: "III. Comptes multiples", group: "Ch. 2 — Le compte de dépôt", level: 2 },

  { id: "ch3-i",   title: "I. Caractéristiques", group: "Ch. 3 — Le compte courant", level: 2 },
  { id: "ch3-ii",  title: "II. Fonctionnement", group: "Ch. 3 — Le compte courant", level: 2 },

  { id: "ch4-a",   title: "A. Le relevé de compte", group: "Ch. 4 — Régime des comptes", level: 2 },
  { id: "ch4-b",   title: "B. Intérêts des découverts", group: "Ch. 4 — Régime des comptes", level: 2 },
  { id: "ch4-c",   title: "C. Anatocisme", group: "Ch. 4 — Régime des comptes", level: 2 },
  { id: "ch4-d",   title: "D. Dates de valeurs", group: "Ch. 4 — Régime des comptes", level: 2 },
  { id: "ch4-e",   title: "E. Contrepassation", group: "Ch. 4 — Régime des comptes", level: 2 },
  { id: "ch4-f",   title: "F. Saisie du solde", group: "Ch. 4 — Régime des comptes", level: 2 },
  { id: "ch4-ii",  title: "II. La clôture du compte", group: "Ch. 4 — Régime des comptes", level: 2 },

  // Sous-titre 2
  { id: "fin-intro", title: "Dette ou capital ?", group: "Avant-propos financement", level: 2 },

  { id: "fin1-i",   title: "I. Le plancher", group: "Ch. 1 — Taux d'intérêts", level: 2 },
  { id: "fin1-ii",  title: "II. Le plafond", group: "Ch. 1 — Taux d'intérêts", level: 2 },
  { id: "fin1-iii", title: "III. Le TAEG", group: "Ch. 1 — Taux d'intérêts", level: 2 },
  { id: "fin1-d",   title: "D. Le scandale Dexia", group: "Ch. 1 — Taux d'intérêts", level: 2 },
  { id: "fin1-e",   title: "E. Suppression sanction automatique", group: "Ch. 1 — Taux d'intérêts", level: 2 },

  { id: "cc-intro", title: "Esprit du régime", group: "Ch. 2 — Crédit à la consommation", level: 2 },
  { id: "cc-i",     title: "I. Champ d'application", group: "Ch. 2 — Crédit à la consommation", level: 2 },
  { id: "cc-ii",    title: "II. L'OPC", group: "Ch. 2 — Crédit à la consommation", level: 2 },
  { id: "cc-iii",   title: "III. Durée de l'OPC", group: "Ch. 2 — Crédit à la consommation", level: 2 },
  { id: "cc-iv",    title: "IV. Interdépendance", group: "Ch. 2 — Crédit à la consommation", level: 2 },
  { id: "cc-v",     title: "V. Protection en cours d'exécution", group: "Ch. 2 — Crédit à la consommation", level: 2 },
  { id: "cc-vi",    title: "VI. Office du juge & forclusion", group: "Ch. 2 — Crédit à la consommation", level: 2 },

  { id: "ci-intro", title: "Modèles & enjeux", group: "Ch. 3 — Crédit immobilier", level: 2 },
  { id: "ci-i",     title: "I. Champ d'application", group: "Ch. 3 — Crédit immobilier", level: 2 },
  { id: "ci-ii",    title: "II. Délai de rétractation", group: "Ch. 3 — Crédit immobilier", level: 2 },
  { id: "ci-iii",   title: "III. L'OPC immobilière", group: "Ch. 3 — Crédit immobilier", level: 2 },
  { id: "ci-iv",    title: "IV. Interdépendance", group: "Ch. 3 — Crédit immobilier", level: 2 },
  { id: "ci-v",     title: "V. Conséquences", group: "Ch. 3 — Crédit immobilier", level: 2 },
  { id: "ci-vi",    title: "VI. Exécution", group: "Ch. 3 — Crédit immobilier", level: 2 },
  { id: "ci-vii",   title: "VII. Prescription", group: "Ch. 3 — Crédit immobilier", level: 2 },

  { id: "conclusion", title: "Repères pour la dissertation", group: "Conclusion", level: 1 },
];

// Map id → component
const SECTIONS = {
  intro: ({ sectionId }) => (
    <>
      <H level={1}>Synthèse — Introduction & Titre 1</H>
      <H level={3} style={{ marginTop: 18 }}>Les opérateurs</H>

      <Pepites sectionId={sectionId} variant="boussole" items={[
        <>Le droit bancaire est <Em>la médecine de l'économie</Em> : il oscille entre <Mask>croissance par le crédit</Mask> et <Mask>stabilité du système</Mask>.</>,
        <>Le <Art>CMF de 2001</Art> (loi Delors 1984) opère la distinction structurante entre <Mask>opérateurs</Mask> (agréments, monopole) et <Mask>opérations</Mask>.</>,
        <>L'agrément a <Mask>trois portées</Mask> : permanente (respect continu), spatiale (passeport européen), spéciale (un agrément par activité).</>,
        <>Monopole bancaire (<Art>L.511-5</Art>) : interdit les opérations à titre <Mask>habituel ET onéreux</Mask>. <Cas>Cass. com. 15 juin 2022</Cas> : pas de conséquences civiles (théorie de l'IG).</>,
        <>Tension structurante : <Mask>intérêt économique</Mask> (croissance, libéralisation) vs <Mask>intérêt protecteur</Mask> (stabilité, partie faible) — grille de lecture universelle.</>,
      ]} />

      <P drop="L">e droit bancaire est <Em>la médecine de l'économie</Em> : il répond aux crises par la modification des règles (causalité juridique). Toute l'histoire du droit bancaire moderne — du <Term>Glass-Steagall Act</Term> (1933) à <Term>Bâle III</Term> — oscille entre deux pôles : favoriser la croissance par le crédit (effet de levier, taux variables, libre prestation de services) et préserver la stabilité du système (fonds propres, monopole, surveillance prudentielle). Le <Art>CMF de 2001</Art> (codifiant la loi Delors de 1984) opère la distinction structurante entre <Term>opérateurs</Term> et <Term>opérations</Term>.</P>

      <P><Term>L'agrément (L.511-9 et s. CMF).</Term> L'activité bancaire est risquée : son accès est verrouillé par le <Term>monopole bancaire</Term>. Chaque métier exige son propre agrément (règle de spécialité), délivré par l'<Art>ACPR</Art> (banques non systémiques) ou la <Art>BCE</Art> (banques systémiques). L'agrément a trois portées : <Em>permanente</Em> (respect continu), <Em>spatiale</Em> (passeport européen) et <Em>spéciale</Em> (un agrément par activité, sauf services connexes — L.311-2).</P>

      <P><Term>Le monopole bancaire (L.511-5).</Term> Il interdit à tout non-agréé d'effectuer des opérations de banque <Strong>à titre habituel et onéreux</Strong> (les deux conditions sont cumulatives). Sanctions : disciplinaires (ACPR), pénales (délit) et civiles. <Em>Évolution clé :</Em> depuis <Cas>Cass. com. 15 juin 2022</Cas>, la Cour refuse à nouveau de tirer des conséquences civiles de la violation du monopole (le prêt reste valable), au nom de la <Term>théorie de l'intérêt général</Term> : la réglementation protège l'IG, non les particuliers, qui ne peuvent donc s'en prévaloir au civil.</P>

      <P><Term>L'incidence du droit communautaire.</Term> Le droit bancaire français est largement européanisé. La <Term>liberté d'établissement</Term> et la <Term>libre prestation de services</Term> permettent à toute banque agréée dans un EM d'opérer dans tous les autres (passeport européen) — au prix d'un <Em>syndrome du cheval de Troie</Em> (les non-européens entrent par l'EM le plus accommodant). Après la crise de 2008, l'UE a mis en place trois piliers de centralisation : le <Term>MSU</Term> (surveillance — BCE pour les banques systémiques), le <Term>MRU</Term> (résolution unique) et le <Term>MES</Term> (stabilité). La jurisprudence européenne fait primer l'intérêt européen sur les politiques nationales (<Cas>CJUE 2024</Cas> — affaire des comptes de dépôt à vue : la rémunération autorisée dans l'EM d'origine s'impose en France).</P>

      <Callout kind="tension" title="Ligne directrice">
        Le droit bancaire vit sous tension permanente entre l'<Term>intérêt économique</Term> (croissance, libéralisation, concurrence) et l'<Term>intérêt protecteur</Term> (stabilité, sécurité, défense de la partie faible). Toute règle peut être lue à travers ce prisme.
      </Callout>
    </>
  ),

  "t2-intro": ({ sectionId }) => (
    <>
      <H level={1}>Titre 2 — Les opérations</H>

      <Pepites sectionId={sectionId} variant="boussole" items={[
        <>Deux familles : <Mask>services de comptes</Mask> (banque dépositaire, teneur de compte) et <Mask>opérations de financement</Mask> (banque prêteuse).</>,
        <>Le client est <Mask>juridiquement la partie faible</Mask> mais <Mask>économiquement le moteur</Mask> du système — opposition fondamentale du Titre 2.</>,
        <>Méthode : pour chaque mécanisme, demander quelle <Mask>crise</Mask> l'a fait naître, quel <Mask>intérêt</Mask> il protège, quel <Mask>mouvement contraire</Mask> il suscite.</>,
      ]} />

      <P drop="L">es <Term>opérations</Term> regroupent les actes par lesquels la banque entre en relation avec sa clientèle. Le législateur les a réparties en deux familles : les <Term>services de comptes</Term> (la banque comme dépositaire et teneur de compte) et les <Term>opérations de financement</Term> (la banque comme prêteuse). Toute la matière est traversée par une opposition fondamentale : <Em>le client est juridiquement la partie faible mais économiquement le moteur du système</Em>. Le législateur, sous la pression alternée des associations de consommateurs et du lobby bancaire, ne cesse de redessiner cet équilibre.</P>

      <Callout kind="info" title="Méthode de dissertation">
        Pour chaque mécanisme, demandez-vous : <Em>quelle crise l'a fait naître ? quel intérêt protège-t-il ? quel mouvement contraire suscite-t-il ?</Em> Le droit bancaire n'est pas un corps de règles, c'est une chronique des rapports de force économiques traduits en droit.
      </Callout>
    </>
  ),

  // ============================== CH1 ==============================
  "ch1-i": ({ sectionId }) => (
    <>
      <H level={2}>Chapitre 1 — L'ouverture du compte</H>
      <H level={3}>I. Le droit au compte</H>

      <Pepites sectionId={sectionId} items={[
        <>Depuis 2008, le compte est un <Mask>droit d'ordre public</Mask> (<Art>L.312-1 CMF</Art>) — la banque ne peut refuser l'ouverture, seulement le crédit.</>,
        <>Mécanisme en 2 temps : 2nd refus → saisine de la <Mask>Banque de France</Mask> qui désigne d'office un établissement teneur.</>,
        <>Le droit au compte n'est <Mask>pas absolu</Mask> : <Cas>Cass. com. 30 juin 2021</Cas> — clôture immédiate possible en cas d'usage illégal.</>,
        <>Loi du 22 décembre 2016 : distinction <Mask>SBM (10 services minimum)</Mask> vs <Mask>SBB (8 services de base)</Mask>, motivation et préavis de 2 mois pour résiliation.</>,
        <>Discrimination interdite sur 3 fronts : <Mask>AERAS / droit à l'oubli</Mask> (loi 28 fév. 2022, délai 5 ans), origine (loi 28 fév. 2017), mobilité (loi 17 mars 2014).</>,
      ]} />

      <P>Depuis 2008, la matière est en mouvement permanent : les articles <Art>L.312-1 et s. CMF</Art> sont constamment modifiés (dernière retouche : loi du 12 mai 2025). Le compte n'est plus un simple service contractuel, c'est devenu un <Term>droit d'ordre public</Term>. La banque ne peut refuser l'ouverture d'un compte ; elle conserve seulement la maîtrise de l'accès au crédit.</P>

      <P>Le droit au compte joue en deux temps : la banque peut refuser une première ouverture, mais après un second refus, le client saisit la <Term>Banque de France</Term> qui désigne d'office un établissement teneur. Depuis 2011, le droit au compte vaut quel que soit le lieu de résidence (y compris pour les expatriés). Il n'est cependant <Term>pas absolu</Term> : il peut être perdu en cas de comportement fautif du titulaire — impayés, usage illégal du compte (<Cas>Cass. com. 30 juin 2021</Cas>) — qui justifie une clôture immédiate.</P>

      <H level={4}>Lutte contre la discrimination</H>
      <P>Trois fronts : la <Term>convention AERAS</Term> et le <Term>droit à l'oubli</Term> (loi du 15 décembre 2015, étendu par la loi du 28 février 2022 — délai ramené à 5 ans pour tous, suppression des questionnaires de santé pour les prêts &lt; 200 000 € remboursés avant 60 ans) ; l'interdiction de la discrimination par l'origine (loi du 28 février 2017) ; et la <Term>mobilité bancaire</Term> (loi du 17 mars 2014), érigée en droit d'ordre public malgré le lobbying de l'EBIC.</P>

      <P>La <Art>loi du 22 décembre 2016</Art> a parachevé l'édifice en distinguant les <Term>SBM</Term> (services bancaires minimum, 10) et les <Term>SBB</Term> (services bancaires de base, 8) et en imposant une motivation et un préavis de 2 mois pour la résiliation par la banque.</P>

      <H level={4}>Vie privée</H>
      <P>Le compte concentre des données extrêmement sensibles. Depuis le RGPD, la CNIL n'exerce plus de contrôle direct (compétence de l'autorité irlandaise), mais la CJUE veille : l'arrêt du <Cas>22 novembre 2022</Cas> limite l'accessibilité publique de certains registres anti-blanchiment au nom de la vie privée.</P>

      <Callout kind="info" title="Connexion droit pénal">
        La chambre criminelle (2011) a affirmé que refuser l'accès au compte ou empêcher la mobilité bancaire peut caractériser une escroquerie ou un abus de confiance imputable au directeur d'agence <Em>personnellement</Em>. La sanction monte d'un cran.
      </Callout>
    </>
  ),

  "ch1-ii": ({ sectionId }) => (
    <>
      <H level={2}>Chapitre 1 — L'ouverture du compte</H>
      <H level={3}>II. Les contrôles à l'ouverture</H>

      <Pepites sectionId={sectionId} items={[
        <>Trois intérêts cumulés : <Mask>intérêt général</Mask> (LCB-FT), intérêt des banques, intérêt des clients (usurpation d'identité).</>,
        <>Tension dissertation : <Mask>devoir de vigilance renforcée</Mask> (<Cas>Cass. com. 22 nov. 2011</Cas>) vs <Mask>devoir de non-ingérence</Mask> qui exonère la banque.</>,
        <>Phishing : régime CMF (<Art>L.133-18 et s.</Art>) <Mask>exclusif</Mask>, écarte le droit commun. <Cas>Quatre arrêts du 12 juin 2025</Cas> : spoofing engage la banque.</>,
        <>Majeur protégé (<Art>art. 499 CC</Art>) : <Cas>Cass. civ. 9 nov. 2011</Cas> — informer le majeur au lieu du curateur engage la banque (<Mask>crédit gratuit + restitution</Mask>).</>,
        <>Mineur : <Cas>Cass. 12 juin 2025</Cas> opère un <Mask>revirement protecteur</Mask> — la banque est responsable si un parent agit seul sur le compte de l'enfant.</>,
      ]} />

      <P>La banque doit vérifier l'exactitude des informations fournies (état civil, adresse, nature de la société). Elle agit pour trois intérêts cumulés : l'<Term>intérêt général</Term> (LCB-FT — dispositif jugé insuffisant : 2 recommandations du Conseil de l'Europe sur 18 effectivement mises en œuvre), l'<Term>intérêt des banques</Term>, et l'<Term>intérêt des clients</Term> (usurpation d'identité).</P>

      <P>En revanche, <Cas>Cass. com. 18 décembre 2007</Cas> lui interdit de contrôler la légalité du séjour du client. La jurisprudence oscille ensuite entre une <Term>obligation de vigilance renforcée</Term> (Cass. com. 22 nov. 2011 — devoir de réagir face aux situations anormales) et un <Term>devoir de non-ingérence</Term> (qui exonère la banque en l'absence de faute caractérisée).</P>

      <Callout kind="tension" title="Vigilance vs. non-ingérence">
        Cette tension entre vigilance et non-ingérence est l'un des axes majeurs de toute dissertation sur les obligations bancaires. La banque est-elle un partenaire de confiance qui doit alerter, ou un simple intermédiaire neutre qui ne doit pas s'immiscer ?
      </Callout>

      <H level={4}>Le paiement frauduleux (phishing)</H>
      <P>Le contentieux explose depuis <Cas>Cass. 18 janv. 2017</Cas>. L'évolution récente fait du régime du CMF (<Art>L.133-18 et s.</Art>) un régime <Term>exclusif</Term> qui écarte le droit commun (Cass. 15 janv. 2025). Quatre arrêts du <Cas>12 juin 2025</Cas> fixent la grille : le spoofing relève du régime CMF, le parent agissant seul sur le compte d'un enfant engage la banque, mais la fraude au président sans anomalie apparente ne l'engage pas.</P>

      <P>La Cass s'aligne sur la CJUE : le client doit <Term>dénoncer immédiatement</Term> le paiement frauduleux, faute de quoi il perd toute indemnisation, alors même qu'il est dans le délai de 13 mois.</P>

      <H level={4}>Le majeur protégé</H>
      <P>La loi de 1968, réécrite en 2007, impose désormais l'autonomie bancaire du majeur protégé : interdiction des <Em>comptes pivots</Em> (un compte pour plusieurs protégés), individualisation du suivi, intervention du tuteur ou curateur uniquement pour les actes importants. L'<Art>article 499 CC</Art> impose à la banque un <Term>devoir de vigilance et d'alerte</Term> en cas d'opération manifestement suspecte.</P>

      <P><Cas>Cass. civ. 9 nov. 2011</Cas> (arrêt majeur) : la banque qui continue d'adresser les informations légales au majeur sous curatelle au lieu du curateur engage sa responsabilité — sanction : crédit gratuit et restitution des intérêts. La cour d'appel avait osé écrire que les banques ne peuvent pas respecter la loi parce qu'elles ont trop de clients : la cassation est cinglante.</P>

      <H level={4}>Le mineur</H>
      <P>Articles <Art>382-1 et 388-1-1 CC</Art> : le mineur est capable pour les actes d'administration, incapable pour les actes de disposition. La jurisprudence a longtemps oscillé. <Cas>Cass. 1ère civ. 11 oct. 2017</Cas> refusait toute obligation générale de vigilance. <Cas>Cass. 12 juin 2025</Cas> opère un revirement protecteur : la banque est responsable lorsqu'un parent agit seul sur le compte de l'enfant sans autorisation — alignement avec la jurisprudence sur les majeurs protégés.</P>
    </>
  ),

  "ch1-iii": ({ sectionId }) => (
    <>
      <H level={2}>Chapitre 1 — L'ouverture du compte</H>
      <H level={3}>III. La convention de compte</H>

      <Pepites sectionId={sectionId} items={[
        <><Art>Loi MURCEF 11 décembre 2001</Art> : convention de compte <Mask>écrite et d'ordre public</Mask> — effective seulement en 2005 après blocage du lobby bancaire.</>,
        <><Mask>DSP1 (2007)</Mask> : régime unique de modification — le silence du client pendant <Mask>2 mois</Mask> vaut acceptation, même pour les clauses essentielles.</>,
        <>L'<Mask>opposition expresse</Mask> du client à une modification annoncée bloque la hausse tarifaire — seul rempart face au déséquilibre du contrat d'adhésion.</>,
      ]} />

      <P>Le compte bancaire est un contrat d'adhésion paradigmatique : le déséquilibre est total. La <Art>loi MURCEF du 11 décembre 2001</Art> a imposé une convention de compte écrite et d'ordre public — effective seulement en 2005 après quatre années de blocage par le lobby bancaire.</P>

      <P>La vraie question n'est plus la formation initiale, mais la <Term>modification unilatérale</Term> des clauses et tarifs en cours de contrat. La <Term>DSP1 (2007)</Term> a unifié le régime : le silence du client pendant 2 mois vaut acceptation, même pour les clauses essentielles, sauf opposition (qui empêche alors l'augmentation tarifaire).</P>

      <Callout kind="info" title="Évolution du régime de modification">
        <DataTable
          headers={["Avant 2007", "Depuis DSP1 (2007)"]}
          rows={[[
            "Dualité : clauses essentielles (modification unilatérale interdite) vs. clauses secondaires (silence vaut accord).",
            "Régime unique : silence pendant 2 mois vaut accord pour toutes les clauses. L'opposition du client bloque la hausse tarifaire."
          ]]}
        />
      </Callout>
    </>
  ),

  "ch1-iv": ({ sectionId }) => (
    <>
      <H level={2}>Chapitre 1 — L'ouverture du compte</H>
      <H level={3}>IV. Les tarifs bancaires</H>

      <Pepites sectionId={sectionId} items={[
        <><Cas>Cass. 1ère civ. 30 juin 2004</Cas> (coffre-fort BNP) valide la <Mask>modification unilatérale</Mask> dans les contrats de longue durée — déclenche cascade législative.</>,
        <>Logique du duel : <Mask>encadrement légal</Mask> là où la loi le prévoit, <Mask>liberté tarifaire</Mask> ailleurs — pousse les banques à transférer la charge.</>,
        <>Commission d'intervention : <Mask>8 €/op et 80 €/mois</Mask> (clients ordinaires) ; <Mask>4 € et 20 €</Mask> (clients fragiles).</>,
        <>Compte inactif : <Mask>30 €/an</Mask> (loi 2016). Avis de tiers détenteurs : <Mask>10 % de la créance, plafond 100 €</Mask> (loi 2019).</>,
      ]} />

      <P>Le principe est la gratuité des services bancaires de base, condition d'effectivité du droit au compte. Mais la pression du lobby bancaire est constante.</P>

      <P>L'arrêt <Cas>Cass. 1ère civ. 30 juin 2004</Cas> (triplement du prix d'un coffre-fort BNP du jour au lendemain — <Em>« Tarifs bancaires soudainement exorbitants, et pourquoi pas ? »</Em> titrait le Dalloz) avait validé la modification unilatérale dans les contrats de longue durée. Réaction législative : la <Art>loi Dalot de 2007</Art> puis une cascade de plafonnements à mesure que les banques inventent de nouveaux frais.</P>

      <Callout kind="warn" title="Logique du duel banques / législateur">
        À chaque création (commissions d'intervention, frais d'information, frais sur compte inactif, frais sur avis de tiers détenteurs), le législateur a dû légiférer en réaction. La logique générale est claire : <Term>encadrement légal là où la loi le prévoit, liberté tarifaire ailleurs</Term> — ce qui pousse les banques à transférer la charge vers les services non encadrés.
      </Callout>

      <DataTable
        headers={["Frais", "Plafond légal"]}
        rows={[
          ["Commission d'intervention (clients ordinaires)", "8 € / opération, 80 €/mois"],
          ["Commission d'intervention (clients fragiles)", "4 € / opération, 20 €/mois"],
          ["Frais d'information", "Gratuité (loi 2015)"],
          ["Compte inactif", "30 €/an (loi 2016)"],
          ["Avis de tiers détenteurs", "10 % de la créance, plafond 100 € (loi 2019)"],
        ]}
      />
    </>
  ),

  "ch1-v": ({ sectionId }) => (
    <>
      <H level={2}>Chapitre 1 — L'ouverture du compte</H>
      <H level={3}>V. Le devoir d'information</H>

      <Pepites sectionId={sectionId} items={[
        <><Cas>Quatre arrêts du 12 juillet 2005</Cas> : la banque doit prouver qu'elle a <Mask>déconseillé l'opération risquée</Mask> (devoir de mise en garde).</>,
        <>Solution singulière : <Mask>pas de conseil positif</Mask> comme les autres professionnels — la banque conserve un statut d'intermédiaire neutre.</>,
        <>Le <Mask>devoir de non-ingérence</Mask> est régulièrement invoqué pour exonérer la banque — régression au regard du droit commun de la responsabilité professionnelle.</>,
      ]} />

      <P>Trois conceptions s'affrontent : minimum légal seul ; minimum légal + devoir de mise en garde (conseil négatif) ; minimum + mise en garde + conseil positif.</P>

      <P>Par les <Cas>quatre arrêts du 12 juillet 2005</Cas>, la Cass a tranché pour la deuxième solution : la banque doit prouver qu'elle a déconseillé l'opération risquée, mais elle n'est pas tenue à un conseil positif comme les autres professionnels.</P>

      <P>L'évolution est ensuite défavorable : la Cour invoque régulièrement le <Term>devoir de non-ingérence</Term> pour exonérer la banque, ce qui constitue une véritable régression au regard du droit commun de la responsabilité professionnelle.</P>

      <Callout kind="prof">
        Là où n'importe quel professionnel (médecin, avocat, expert-comptable) doit conseiller positivement son client, la banque conserve un statut singulier d'intermédiaire neutre. Cette singularité est-elle encore justifiable à l'heure du conseil patrimonial intégré et de la concurrence des fintech ?
      </Callout>
    </>
  ),

  // ============================== CH2 ==============================
  "ch2-intro": ({ sectionId }) => (
    <>
      <H level={2}>Chapitre 2 — Le compte de dépôt</H>
      <H level={3}>Nature juridique & garanties</H>

      <Pepites sectionId={sectionId} variant="boussole" items={[
        <>Compte de dépôt = <Mask>dépôt translatif</Mask> : la banque devient propriétaire des fonds, le client n'a qu'un <Mask>droit de créance</Mask> (chirographaire en cas de faillite).</>,
        <>Aléa moral et <Mask>bank run</Mask> : effet de levier rend la banque vulnérable même solvable. Parade : FDIC US (250 000 $), FGDR européen post-2008.</>,
        <>UE post-crise : remplacement du <Mask>Bail-Out</Mask> (sauvetage public) par le <Mask>Bail-In</Mask> (recapitalisation par actionnaires/créanciers) — risque de stock run.</>,
        <>Garantie FGDR (<Art>L.312-4-1 CMF</Art>) : <Mask>100 000 €</Mask> par déposant, automatique. <Mask>500 000 €</Mask> dérogatoire (héritage, vente immo) sur demande.</>,
        <><Cas>CJUE 4 oct. 2018</Cas> : la garantie est <Mask>inconditionnelle</Mask>, l'État ne peut refuser son activation. Cumul possible : dépôts + titres (700 k€) + assurance-vie.</>,
      ]} />

      <P><Term>Un dépôt translatif.</Term> Le compte de dépôt est régi par le droit commun du dépôt (Code civil), mais avec une particularité fondamentale : la banque devient <Term>propriétaire</Term> des fonds déposés. Le client n'a plus qu'un <Term>droit de créance</Term>. En cas de faillite, il devient créancier chirographaire — ce qui justifie tout le dispositif protecteur.</P>

      <P><Term>L'aléa moral et le bank run.</Term> Si une rumeur de faillite circule, les clients retirent massivement (<Em>bank run</Em>). Or la banque, par effet de levier, prête plus qu'elle ne détient en liquidités : même solvable, elle peut s'effondrer si tout le monde retire en même temps. La parade est née aux États-Unis avec le <Term>FDIC</Term> (garantie aujourd'hui à 250 000 $). En Europe, il a fallu attendre la crise de 2008 — l'absence d'harmonisation avait créé une concurrence déloyale (l'Irlande garantissait 100 % des dépôts, sa dette privée est devenue dette publique pour 40 % du PIB).</P>

      <H level={4}>Du Bail-Out au Bail-In</H>
      <P>Pour rompre l'aléa moral, l'UE a remplacé le sauvetage public (<Term>Bail-Out</Term>, argent de l'État) par le sauvetage privé (<Term>Bail-In</Term>, recapitalisation par les actionnaires et créanciers).</P>

      <Callout kind="prof">
        Le Bail-In est une fausse bonne idée. Les actionnaires risquent désormais d'agir comme les déposants paniqués (<Em>stock run</Em>) et la spéculation à la baisse par les hedge funds est encouragée — ce qui aggrave la crise au lieu de la résoudre.
      </Callout>

      <H level={4}>Les garanties européennes (L.312-4-1 et s. CMF)</H>
      <P>Le <Term>Fonds de Garantie des Dépôts et de Résolution (FGDR)</Term> couvre quatre types de garanties qui peuvent se cumuler. La <Term>garantie des dépôts</Term> à 100 000 € par déposant et par banque joue automatiquement (la BdF transfère les comptes, le client n'a rien à faire).</P>

      <DataTable
        headers={["Garantie", "Plafond", "Modalité"]}
        rows={[
          ["Dépôts", "100 000 €", "Automatique"],
          ["Dérogatoire (héritage, indemnité corporelle, vente immo)", "500 000 €", "Sur demande"],
          ["Comptes-titres", "700 000 €", "Cumule avec dépôts"],
          ["Assurance-vie", "100 000 €", "Cumule"],
        ]}
      />

      <P>La CJUE rappelle que la garantie est inconditionnelle : l'État ne peut refuser son activation, même si l'indisponibilité est temporaire (<Cas>CJUE 4 oct. 2018</Cas>), et lorsque plusieurs garanties existent, le déposant choisit.</P>
    </>
  ),

  "ch2-i": ({ sectionId }) => (
    <>
      <H level={2}>Chapitre 2 — Le compte de dépôt</H>
      <H level={3}>I. Caractéristiques générales</H>

      <Pepites sectionId={sectionId} items={[
        <>Le compte de dépôt a une seule <Mask>fonction de paiement</Mask>, pas de fonction de crédit — pas de découvert possible (≠ compte courant).</>,
        <>Y sont inscrites uniquement des créances <Mask>certaines, liquides, exigibles</Mask> (le compte courant accepte les futures et conditionnelles).</>,
        <>L'<Mask>inscription en compte vaut paiement</Mask> et fait perdre l'individualité de la créance — seul subsiste le solde global.</>,
      ]} />

      <P>Le compte de dépôt n'a qu'une <Term>fonction de paiement</Term>, pas de fonction de crédit (seul le compte courant combine les deux). Pas de découvert possible, donc.</P>

      <P>Seules y sont inscrites des créances <Term>certaines, liquides, exigibles</Term> (à la différence du compte courant qui accepte les créances futures et conditionnelles). L'inscription en compte vaut paiement et fait perdre à la créance son individualité — seul subsiste le solde global.</P>

      <Callout kind="info" title="À retenir pour la dissertation">
        La distinction <Em>compte de dépôt / compte courant</Em> est l'une des plus structurantes du droit bancaire. Elle reflète une opposition entre un service grand public protégé (dépôt) et un instrument professionnel à risque (compte courant à découvert).
      </Callout>
    </>
  ),

  "ch2-ii": ({ sectionId }) => (
    <>
      <H level={2}>Chapitre 2 — Le compte de dépôt</H>
      <H level={3}>II. Compte unique à titulaires multiples</H>

      <Pepites sectionId={sectionId} items={[
        <>Indivision post-successorale : héritiers co-titulaires <Mask>sans solidarité</Mask> — toute opération exige l'accord unanime, à défaut responsabilité de la banque.</>,
        <>Compte joint : <Mask>double solidarité</Mask> — active (chacun mouvemente) et passive (la banque réclame le tout à n'importe lequel).</>,
        <><Cas>Cass. com. 8 mars 2017</Cas> : la solidarité passive ne se présume jamais (sauf droit commercial), doit être <Mask>stipulée expressément</Mask>.</>,
        <><Cas>Cass. 1ère civ. 17 janv. 2006</Cas> : un couple marié n'a <Mask>pas besoin de compte joint</Mask> — sous régime primaire, les revenus deviennent biens communs.</>,
      ]} />

      <DataTable
        headers={["Type", "Mécanisme", "Effet en cas de dette"]}
        rows={[
          [
            "Indivision post-successorale (décès)",
            "Les héritiers deviennent co-titulaires. Pas de solidarité : toute opération exige l'accord de tous (sauf aménagement).",
            "Si la banque autorise une opération sans accord unanime, elle engage sa responsabilité.",
          ],
          [
            "Compte joint (mariage, concubinage, PACS)",
            <><Term>Double solidarité</Term> : active (chacun mouvemente) et passive (la banque réclame le tout à n'importe lequel).</>,
            <><Cas>Cass. com. 8 mars 2017</Cas> : la solidarité passive ne se présume jamais (sauf droit commercial). Doit être stipulée expressément.</>,
          ],
        ]}
      />

      <P>L'arrêt <Cas>Cass. 1ère civ. 17 janv. 2006</Cas> expose pourquoi un couple marié n'a pas besoin de compte joint : sous le régime primaire, les revenus deviennent biens communs après perception, l'argent est présumé commun, et un créancier ne peut saisir le compte au nom d'un seul époux pour une dette personnelle, faute de solidarité passive.</P>
    </>
  ),

  "ch2-iii": ({ sectionId }) => (
    <>
      <H level={2}>Chapitre 2 — Le compte de dépôt</H>
      <H level={3}>III. Comptes multiples à titulaire unique</H>

      <Pepites sectionId={sectionId} items={[
        <>L'<Mask>interdit bancaire</Mask> ne contamine pas les autres comptes : principe du <Mask>cloisonnement des patrimoines</Mask> (ordonnance EIRL 2010).</>,
        <>Sauf clause contraire, <Mask>chaque compte est autonome</Mask> — pas de compensation entre créditeur et débiteur, agios facturés malgré le solde positif sur l'autre.</>,
        <><Cas>Cass. com. 16 déc. 2014</Cas> : pas de compensation entre compte bancaire et PEA, soldes <Mask>non fongibles</Mask> — l'autonomie s'impose même avec clause.</>,
      ]} />

      <P>Trois questions structurent ce contentieux.</P>

      <P>Premièrement, l'<Term>interdit bancaire</Term> ne contamine pas les autres comptes : depuis l'ordonnance de 2010 favorable à l'EIRL, le principe est le <Em>cloisonnement des patrimoines</Em>.</P>

      <P>Deuxièmement, en l'absence de clause contraire, <Term>chaque compte est autonome</Term> : pas de compensation entre un compte créditeur et un compte débiteur (la banque peut facturer des agios sur le second sans neutralisation par le premier).</P>

      <P>Troisièmement, pour qu'il y ait compensation, encore faut-il que les soldes soient <Term>fongibles</Term>. Tel n'est pas le cas entre un compte bancaire et un PEA (<Cas>Cass. com. 16 déc. 2014</Cas>) : même avec une clause de compensation, l'autonomie s'impose.</P>
    </>
  ),

  // ============================== CH3 ==============================
  "ch3-i": ({ sectionId }) => (
    <>
      <H level={2}>Chapitre 3 — Le compte courant</H>
      <H level={3}>I. Caractéristiques générales</H>

      <Pepites sectionId={sectionId} items={[
        <>Compte courant = <Mask>dérogatoire</Mask>, réservé aux professionnels : combine fonction de dépôt et de crédit (fonctionne à découvert).</>,
        <>Qualification stricte : conditions cumulatives <Mask>intentionnelle</Mask> (volonté claire) et <Mask>matérielle</Mask> (réciprocité, enchevêtrement des opérations).</>,
        <>Régime souple : peuvent être inscrites les créances <Mask>futures ou conditionnelles</Mask> issues de contrats à exécution successive.</>,
        <>Principe d'<Mask>affectation</Mask> : à défaut de stipulation contraire, toutes les créances du client sont affectées à la banque (<Cas>Cass. com. 3 juill. 2012</Cas>).</>,
      ]} />

      <P>Le compte courant est <Term>dérogatoire</Term>, réservé en principe aux professionnels. Sa dangerosité tient à ce qu'il combine fonction de dépôt et fonction de crédit : il fonctionne à découvert, ce qui permet à l'entreprise de se refinancer en continu.</P>

      <P>La qualification de compte courant n'est pas libre : la Cass l'encadre strictement, à défaut de quoi il est requalifié en compte de dépôt. Deux conditions cumulatives : une <Term>condition intentionnelle</Term> (volonté claire des parties) et une <Term>condition matérielle</Term> — la réciprocité des remises et l'enchevêtrement des opérations. Sur chaque relevé doivent figurer des écritures dans les deux sens.</P>

      <P>Le régime des créances inscrites est plus souple que celui du compte de dépôt : peuvent y être inscrites les créances <Term>futures ou conditionnelles</Term> issues de contrats à exécution successive, dans le <Em>différé</Em> du compte.</P>

      <Callout kind="info" title="Principe d'affectation">
        À défaut de stipulation contraire, toutes les créances du client sont affectées au profit de la banque ; elles entrent dans le mécanisme global du compte. La neutralisation suppose un accord clair (<Cas>Cass. com. 3 juill. 2012</Cas>). En pratique, l'entreprise s'engage à une <Em>centralisation des paiements</Em>, perdant ainsi sa mobilité bancaire et engageant sa responsabilité contractuelle en cas de violation.
      </Callout>
    </>
  ),

  "ch3-ii": ({ sectionId }) => (
    <>
      <H level={2}>Chapitre 3 — Le compte courant</H>
      <H level={3}>II. Fonctionnement du compte courant</H>

      <Pepites sectionId={sectionId} items={[
        <><Mask>Indivisibilité du solde</Mask> : exigible seulement à la clôture. Conséquence — tant que le compte n'est pas clos, le solde est <Mask>imprescriptible</Mask>.</>,
        <><Cas>Cass. 1ère civ. 18 décembre 2024</Cas> : la finalité du compte s'apprécie <Mask>au moment de son ouverture</Mask>, peu importe les opérations ultérieures.</>,
        <><Cas>Cass. 2ème civ. 13 nov. 2014</Cas> : la créance inscrite perd son individualité — la banque doit obtenir un <Mask>nouveau titre exécutoire</Mask> par jugement.</>,
        <><Cas>Cass. com. 13 nov. 2012</Cas> : le <Mask>silence du client sur les agios vaut acceptation</Mask> — la banque peut faire varier le taux si non contesté.</>,
      ]} />

      <P><Term>Indivisibilité du solde.</Term> Le solde n'est exigible qu'à la clôture du compte. Conséquence radicale : tant que le compte n'est pas clos, <Term>le solde est imprescriptible</Term>. La prescription ne court qu'à la clôture.</P>

      <P>Difficulté typique : un crédit à la consommation viré sur un compte courant professionnel — quel régime appliquer pour l'extinction ? La jurisprudence a hésité (<Cas>1ère civ. 22 janv. 2009</Cas> : régime du crédit à la conso protecteur ; <Cas>6 janv. 2011</Cas> : revirement vers le régime du compte courant et son imprescriptibilité). L'arrêt récent <Cas>1ère civ. 18 décembre 2024</Cas> tranche : la finalité du compte s'apprécie <Term>au moment de son ouverture</Term>, peu importe les opérations ultérieures.</P>

      <P><Term>Perte d'individualité des créances.</Term> Les créances inscrites se fondent dans le solde global. <Cas>Cass. 2ème civ. 13 nov. 2014</Cas> : un acte notarié vaut titre exécutoire, mais une fois la créance inscrite en compte, la banque ne peut plus s'en prévaloir — elle doit obtenir un nouveau titre exécutoire par jugement.</P>

      <P>Sur le terrain des intérêts, <Cas>Cass. com. 13 nov. 2012</Cas> consacre que le silence du client sur les agios vaut acceptation : la banque peut faire varier le taux si le client ne conteste pas.</P>
    </>
  ),

  // ============================== CH4 ==============================
  "ch4-a": ({ sectionId }) => (
    <>
      <H level={2}>Chapitre 4 — Le régime des comptes bancaires</H>
      <H level={3}>I-A. Le relevé de compte</H>

      <Pepites sectionId={sectionId} items={[
        <><Cas>Cass. 26 mars 1996</Cas> : les clauses faisant valoir le silence du client comme accord sont <Mask>abusives</Mask> — il peut contester tant qu'il est dans les délais.</>,
        <>Délais : <Mask>5 ans</Mask> droit commun depuis 2008 ; <Mask>13 mois de forclusion</Mask> pour paiements frauduleux (<Art>L.133-24 CMF</Art>).</>,
        <><Cas>Cass. com. 9 fév. 2022</Cas> : le délai de 13 mois <Mask>ne concerne pas la caution</Mask>.</>,
        <><Cas>Cass. com. 14 janv. 2026</Cas> : même dans les 13 mois, si le paiement n'a <Mask>pas été dénoncé sans tarder</Mask>, la banque est intouchable.</>,
      ]} />

      <P>Le relevé matérialise l'obligation de la banque-dépositaire de rendre compte. Mensuel et gratuit (service de base) ; hebdomadaire et payant.</P>

      <P>Sur le plan juridique, la question centrale est la portée du silence du client. La position ancienne — silence vaut accord — a été désavouée par <Cas>Cass. 26 mars 1996</Cas> qui qualifie ces clauses d'abusives. Le <Cas>TGI Paris 2005</Cas> a recensé 8 clauses abusives parmi les clauses-types : le silence du client n'a aucune incidence, il peut contester tant qu'il est dans les délais.</P>

      <H level={4}>Délais de contestation</H>
      <DataTable
        headers={["Avant 2008", "Depuis 2008", "Régime DSP1 (paiements frauduleux)"]}
        rows={[
          ["10 ans (droit commun)", "5 ans (prescription)", <><Term>13 mois</Term> de forclusion (<Art>L.133-24 CMF</Art>)</>],
        ]}
      />

      <P><Cas>Cass. com. 9 fév. 2022</Cas> : le délai de 13 mois ne concerne pas la caution. <Cas>Cass. com. 14 janv. 2026</Cas> : même dans le délai de 13 mois, si le paiement n'a pas été dénoncé sans tarder, la banque est intouchable.</P>
    </>
  ),

  "ch4-b": ({ sectionId }) => (
    <>
      <H level={2}>Chapitre 4 — Le régime des comptes bancaires</H>
      <H level={3}>I-B. Les intérêts des découverts en compte</H>

      <Pepites sectionId={sectionId} items={[
        <>Crédit gratuit par principe (<Art>art. 1905 CC</Art>) : agios subordonnés à <Mask>stipulation d'intérêt + stipulation du taux</Mask>. À défaut : taux légal.</>,
        <><Cas>Cass. 1ère civ. 9 fév. 1988</Cas> : l'écrit devient <Mask>condition de validité</Mask> du taux conventionnel (auparavant simple règle de preuve).</>,
        <><Cas>Cass. AP 1er déc. 1995</Cas> : revirement majeur admettant la <Mask>fixation unilatérale du taux variable</Mask> en cours d'exécution sous condition de non-abus.</>,
        <>Tension franco-américaine : prix juste = <Mask>voulu par les parties</Mask> (France, fixité) vs <Mask>prix du marché</Mask> (USA, variabilité, subprimes).</>,
        <><Cas>Cass. 25 mars 2020 Dexia</Cas> + <Cas>4 nov. 2021</Cas> : <Mask>clauses plancher</Mask> valides — pourtant contraire à <Cas>CJUE 21 déc. 2016</Cas>.</>,
      ]} />

      <P>Le principe est que le crédit est gratuit (<Art>article 1905 CC</Art>). Pour facturer des agios, deux étapes successives sont nécessaires : la <Term>stipulation d'intérêt</Term> (qui pose le principe), puis la <Term>stipulation du taux</Term> (qui en fixe le montant). À défaut de stipulation d'intérêt, pas d'agios. À défaut de taux valable, application du taux légal.</P>

      <H level={4}>La fixation du taux initial</H>
      <P>De 1804 à 1988, l'écrit était une règle de preuve, la banque pouvait prouver le taux conventionnel par tout moyen. Par les arrêts <Cas>1ère civ. 9 fév. 1988</Cas> et <Cas>Cass. com. 12 avril 1988</Cas>, l'écrit est devenu <Term>condition de validité</Term>. Pas d'écrit, pas de taux conventionnel — application du taux légal, même pour les professionnels.</P>

      <H level={4}>La variabilité du taux d'intérêt</H>
      <P>Bataille doctrinale majeure. La position <Term>ancienne</Term> (fixité du taux) reposait sur une idée simple : le prix est un élément essentiel du contrat onéreux, il doit être déterminé ou déterminable dès la conclusion. Toute clause de taux variable était donc nulle.</P>

      <P>Sous la pression du lobby, la Cass a cédé : <Cas>Cass. AP 1er déc. 1995</Cas> admet la fixation unilatérale en cours d'exécution sous condition de non-abus, et <Cas>Cass. com. 9 juillet 1996</Cas> étend la solution aux prêts bancaires.</P>

      <Callout kind="prof">
        Ce revirement n'avait aucune justification économique — la fixité n'avait pas empêché les Trente Glorieuses ; il a ouvert la voie à la crise des subprimes en transférant le risque d'inflation sur les emprunteurs.
      </Callout>

      <Callout kind="tension" title="Approche française vs. américaine du « juste prix »">
        L'approche <Em>française traditionnelle</Em> (fixité) considère qu'un prix est juste parce qu'il a été voulu par les deux parties — primauté de la volonté contractuelle, sécurité, stabilité. L'approche <Em>américaine</Em> (variabilité) tient pour juste le prix du marché à chaque instant — d'où l'adaptation continue du contrat. La crise des subprimes illustre l'échec de cette seconde logique.
      </Callout>

      <P><Term>Information et symétrie.</Term> <Cas>Cass. 20 déc. 2007</Cas> (suivi par la loi de janvier 2008 — L.313-25 et s. C. cons.) : pas d'obligation d'avertissement spécifique à chaque variation, simple information annuelle. Sur la symétrie, le contentieux récent (<Cas>Cass. 25 mars 2020 Banque Dexia</Cas> ; <Cas>Cass. 4 nov. 2021</Cas>) admet la validité des <Em>clauses plancher</Em> — la banque peut maintenir des taux élevés malgré l'effondrement du marché. La protection contre les clauses abusives ne profite pas aux personnes morales de droit public, seulement aux consommateurs. Cette solution est pourtant contraire à la jurisprudence européenne (<Cas>CJUE 21 déc. 2016</Cas>).</P>
    </>
  ),

  "ch4-c": ({ sectionId }) => (
    <>
      <H level={2}>Chapitre 4 — Le régime des comptes bancaires</H>
      <H level={3}>I-C. Anatocisme — la capitalisation des intérêts</H>

      <Pepites sectionId={sectionId} items={[
        <>Anatocisme = intérêts produisent des intérêts. <Mask>Temps de doublement ≈ 70 / taux</Mask> (à 10 % la dette double en 7 ans, à 20 % en 3,5 ans).</>,
        <>Droit civil (<Art>art. 1343-2 CC</Art>) : admis si intérêts dus depuis <Mask>au moins 1 an</Mask> + <Mask>demande en justice OU convention expresse</Mask>.</>,
        <><Cas>Civ. 1ère 4 décembre 1990</Cas> : compte courant pro <Mask>neutralise</Mask> le Code civil — capitalisations infra-annuelles autorisées.</>,
        <>Conso et immobilier (<Art>L.313-51 C. cons.</Art>) : <Mask>interdiction</Mask>. <Cas>Civ. 25 mai 2022</Cas> : la caution professionnelle qui paie ces intérêts est déchue de son recours.</>,
      ]} />

      <P>L'anatocisme est le mécanisme par lequel les intérêts produisent eux-mêmes des intérêts.</P>

      <Callout kind="warn" title="Règle économique du temps de doublement">
        <Term>Temps de doublement ≈ 70 / taux d'intérêt.</Term> À 10 % une dette double en 7 ans, à 20 % en 3,5 ans, à 30 % en 2,5 ans. La dette devient exponentielle, l'emprunteur ruiné.
      </Callout>

      <P>L'anatocisme est légal mais strictement encadré, avec un régime à plusieurs étages selon la qualité de l'emprunteur.</P>

      <DataTable
        headers={["Régime", "Solution"]}
        rows={[
          [<><Term>Droit civil</Term> (art. 1343-2 CC)</>, "Admis à deux conditions cumulatives : intérêts dus depuis au moins 1 an (OP) + demande en justice ou convention expresse."],
          [<><Term>Droit commercial</Term> (compte courant pro)</>, <><Cas>Civ. 1ère 4 décembre 1990</Cas> : neutralisation du Code civil, autorisation des capitalisations infra-annuelles.</>],
          [<><Term>Droit de la consommation</Term></>, <><Term>Interdiction</Term> (Civ. 9 fév. 2012).</>],
          [<><Term>Droit immobilier</Term> (L.313-51 C. cons.)</>, <><Term>Interdiction</Term>. <Cas>Civ. 25 mai 2022</Cas> : la caution professionnelle qui paie des intérêts anatocistes interdits commet une faute et est déchue de son recours — interdiction de contournement indirect.</>],
          ["Produits dérivés", "Loi PACTE 2019 : autorisation infra-annuelle, pour attirer les investisseurs."],
        ]}
      />
    </>
  ),

  "ch4-d": ({ sectionId }) => (
    <>
      <H level={2}>Chapitre 4 — Le régime des comptes bancaires</H>
      <H level={3}>I-D. Les dates de valeurs</H>

      <Pepites sectionId={sectionId} items={[
        <>Pratique ancienne : <Mask>post-dater les crédits</Mask> et <Mask>anti-dater les débits</Mask> — le compte apparaissait débiteur, agios sur découvert technique.</>,
        <><Art>L.133-14 CMF</Art> : pour les paiements dématérialisés en euros, la date juridique doit correspondre à la <Mask>date réelle</Mask>.</>,
        <>Pour les chèques, la banque conserve la possibilité d'un décalage de <Mask>J+1 ou J-1</Mask> — exception persistante.</>,
      ]} />

      <P>La date <Em>réelle</Em> est celle de l'opération ; la date <Em>de valeur</Em> est celle retenue pour le calcul des intérêts.</P>

      <P>La pratique ancienne consistait à <Term>post-dater les crédits</Term> et <Term>anti-dater les débits</Term> : le compte apparaissait artificiellement débiteur et la banque déclenchait des agios sur un découvert technique. La Cass donnait raison aux banques au nom des coûts techniques de traitement.</P>

      <P>L'<Art>article L.133-14 CMF</Art> (qui ne joue que pour les paiements en euros) a renversé la logique : pour les paiements dématérialisés, la date juridique doit correspondre à la date réelle. Pour les chèques, la banque conserve la possibilité d'un décalage de J+1 ou J-1.</P>
    </>
  ),

  "ch4-e": ({ sectionId }) => (
    <>
      <H level={2}>Chapitre 4 — Le régime des comptes bancaires</H>
      <H level={3}>I-E. La contrepassation des écritures</H>

      <Pepites sectionId={sectionId} items={[
        <>Chèque sans provision : contrepassation <Mask>libre, sans recours préalable</Mask> (<Cas>Cass. com. 13 nov. 2012</Cas>) — c'est au bénéficiaire de poursuivre.</>,
        <>Virement, même frauduleux : la contrepassation suppose l'<Mask>accord du bénéficiaire</Mask> (<Cas>Cass. com. 24 nov. 2021</Cas>).</>,
        <>Affacturage (<Cas>Cass. com. 29 avril 2014</Cas>) : la contrepassation <Mask>ne vaut pas paiement</Mask> — l'affactureur reste propriétaire des créances par subrogation.</>,
      ]} />

      <P>En principe, la banque qui constate une erreur peut inscrire l'opération inverse. Mais le régime varie selon l'instrument.</P>

      <DataTable
        headers={["Instrument", "Régime"]}
        rows={[
          [<><Term>Chèque sans provision</Term></>, <>Contrepassation libre, sans recours préalable (<Cas>Cass. com. 13 nov. 2012</Cas>) — c'est au bénéficiaire de poursuivre l'auteur.</>],
          [<><Term>Virement, même frauduleux</Term></>, <>Contrepassation suppose l'accord du bénéficiaire (<Cas>Cass. com. 24 nov. 2021</Cas>).</>],
          [<><Term>Affacturage</Term></>, <>La contrepassation ne vaut pas paiement : l'affactureur reste propriétaire des créances transmises par subrogation (<Cas>Cass. com. 29 avril 2014</Cas>).</>],
        ]}
      />
    </>
  ),

  "ch4-f": ({ sectionId }) => (
    <>
      <H level={2}>Chapitre 4 — Le régime des comptes bancaires</H>
      <H level={3}>I-F. La saisie du solde du compte en banque</H>

      <Pepites sectionId={sectionId} items={[
        <>Saisie <Mask>triangulaire</Mask> : créancier saisissant / débiteur saisi / banque tiers-saisi. Identification via <Mask>fichier FICOBA</Mask> (loi 24 décembre 2021).</>,
        <><Cas>Cass. 2ème civ. 26 mai 2011</Cas> : sanction automatique seulement en cas d'<Mask>absence totale de réponse</Mask> — sinon retour au droit commun (faute, préjudice, lien).</>,
        <>Régime indulgent pour les banques : pour les autres tiers saisis, une simple information erronée entraîne déjà la <Mask>condamnation automatique</Mask>.</>,
        <>Solde créditeur bloqué et attribué au saisissant. <Cas>Cass. 2ème civ. 1er oct. 2009</Cas> : suspension si contestation jusqu'à l'issue judiciaire.</>,
        <><Cas>Cass. 2ème civ. 14 fév. 2008</Cas> : <Mask>filiale</Mask> a personnalité propre (saisie devant juge étranger), <Mask>succursale</Mask> n'en a pas (saisie en France).</>,
      ]} />

      <P>La saisie est une opération <Term>triangulaire</Term> (créancier saisissant / débiteur saisi / banque tiers-saisi). Le créancier doit identifier les comptes via le <Term>fichier FICOBA</Term> (consultable par le commissaire de justice — loi du 24 décembre 2021 a assoupli les conditions). La banque ne peut opposer le secret bancaire et doit coopérer.</P>

      <H level={4}>Sanction de la non-coopération</H>
      <P>La sanction automatique (la banque devient elle-même débitrice) ne joue qu'en cas d'absence <Em>totale</Em> de réponse. Si la banque répond, même de façon incomplète ou inutile, on retourne au droit commun de la responsabilité civile (<Cas>Cass. 2ème civ. 26 mai 2011</Cas>) — le créancier doit alors prouver faute, préjudice et lien de causalité.</P>

      <Callout kind="info" title="Faveur jurisprudentielle aux banques">
        Pour les autres tiers saisis (non-banques), une simple information erronée entraîne déjà la condamnation automatique. Les banques bénéficient d'un régime plus indulgent — illustration discrète du poids du lobby dans la fabrique du droit.
      </Callout>

      <H level={4}>Fonctionnement pendant la saisie</H>
      <P>À compter de la date, le solde créditeur est bloqué et attribué au créancier saisissant. Les autres créanciers sont écartés. Si le débiteur conteste, le paiement est suspendu jusqu'à l'issue judiciaire (<Cas>Cass. 2ème civ. 1er oct. 2009</Cas>). Après la date, le compte continue de fonctionner : les nouveaux crédits ne sont pas saisis ; les nouveaux débits réduisent le montant saisi.</P>

      <H level={4}>Le RSA bancaire (2009)</H>
      <P>La saisie ne peut priver le débiteur d'un minimum vital. Certaines sommes sont insaisissables (prestations sociales). Depuis 2009, la banque doit faire respecter ces protections automatiquement.</P>

      <H level={4}>Portée extra-territoriale</H>
      <P>Selon <Cas>Cass. 2ème civ. 14 fév. 2008</Cas>, tout dépend de la structure : la filiale a sa personnalité propre (saisie devant le juge étranger), la succursale n'en a pas (rattachement à la société mère, saisie en France).</P>
    </>
  ),

  "ch4-ii": ({ sectionId }) => (
    <>
      <H level={2}>Chapitre 4 — Le régime des comptes bancaires</H>
      <H level={3}>II. La clôture du compte</H>

      <Pepites sectionId={sectionId} items={[
        <>Lors de la rupture, la banque établit un <Mask>arrêté du compte</Mask> : restitution du solde si créditeur, paiement par le client si débiteur (avec intérêts conventionnels).</>,
        <>Comptes en déshérence (loi de 2014, <Art>L.312-19 CMF</Art>) : la banque doit chercher l'identité du titulaire pendant <Mask>12 mois à 10 ans</Mask> selon les hypothèses.</>,
        <>Après <Mask>20 ans</Mask>, l'État devient propriétaire des fonds via la <Mask>Caisse des dépôts</Mask>.</>,
      ]} />

      <P>Lors de la rupture, la banque établit un arrêté : restitution du solde si créditeur, paiement par le client si débiteur (avec intérêts conventionnels).</P>

      <P>Cas particulier des <Term>comptes en déshérence</Term> (loi de 2014, <Art>L.312-19 CMF</Art>) : la banque doit chercher l'identité du titulaire pendant 12 mois à 10 ans selon les hypothèses. À défaut et après 20 ans, l'État devient propriétaire via la Caisse des dépôts.</P>
    </>
  ),

  // ============================== FINANCEMENT INTRO ==============================
  "fin-intro": ({ sectionId }) => (
    <>
      <H level={1} style={{ marginBottom: 16 }}>Sous-titre 2 — Les opérations de financement</H>
      <H level={3}>Dette ou capital ?</H>

      <Pepites sectionId={sectionId} variant="boussole" items={[
        <>Deux modes de financement : par la <Mask>dette</Mask> (intérêts onéreux, saisie possible) vs par le <Mask>capital</Mask> (actionnaires, gratuité, rémunération conditionnelle).</>,
        <>La France a privilégié la dette : <Mask>51 % du financement par crédit bancaire</Mask> contre 35 % en moyenne UE.</>,
        <>Conséquence : <Mask>extrême sensibilité</Mask> de l'économie française aux variations de taux et fragilité induite par chaque crise monétaire.</>,
        <>Position du professeur : la voie de la dette est <Mask>la plus mauvaise</Mask> — déclin du financement par le capital en France.</>,
      ]} />

      <P>Comment finance-t-on l'avenir ? Par la dette ou par le capital.</P>

      <DataTable
        headers={["Par la dette", "Par le capital"]}
        rows={[[
          "Système principal en France. L'argent est prêté à titre onéreux ; les intérêts pèsent sur la rentabilité (réduction de la marge de croissance). Si l'emprunteur fait défaut, la banque peut saisir. La banque facture ses services et est rémunérée même si l'opération échoue.",
          "Argent « gratuit » : les investisseurs deviennent actionnaires (≠ créanciers). Pas d'intérêts, rémunération uniquement en cas de bénéfice et postérieurement. Déclin de ce mode en France.",
        ]]}
      />

      <Callout kind="prof">
        La France a privilégié la voie de la dette — la plus mauvaise selon le professeur. La dépendance française au crédit bancaire (<Term>51 % contre 35 % en moyenne UE</Term>) explique l'extrême sensibilité de notre économie aux variations de taux et la fragilité induite par chaque crise monétaire.
      </Callout>
    </>
  ),

  // ============================== CH1 FIN ==============================
  "fin1-i": ({ sectionId }) => (
    <>
      <H level={2}>Chapitre 1 — La réglementation des taux d'intérêts</H>
      <H level={3}>I. Le plancher</H>

      <Pepites sectionId={sectionId} items={[
        <>La <Mask>BCE</Mask> fixe un <Mask>taux directeur</Mask> qui sert de référence et de plancher aux taux conventionnels en zone euro.</>,
        <>Trois zones de politique monétaire : <Mask>favorable (&lt; 2 %)</Mask>, neutre (≈ 2 %), <Mask>douleur (&gt; 4 %)</Mask> — freinage brutal et risque de récession.</>,
        <>Surendettement mondial ≈ <Mask>345 % du PIB</Mask> en 2022 — toute hausse fragilise des économies entières.</>,
      ]} />

      <P>Les banques centrales (BCE pour la zone euro) fixent un <Term>taux directeur</Term> qui sert de référence et de plancher aux taux conventionnels. La politique monétaire se calibre sur trois zones :</P>

      <DataTable
        headers={["Zone", "Niveau", "Effet"]}
        rows={[
          ["Favorable", "< 2 %", "Argent facile, stimule l'activité"],
          ["Neutre", "≈ 2 %", "Équilibre recherché"],
          ["Douleur", "> 4 %", "Freinage brutal, risque de récession"],
        ]}
      />

      <Callout kind="info" title="Inflation vs. prescription : deux manières d'effacer la dette">
        L'approche <Em>économique</Em> tient que l'inflation « mange » la dette (sa valeur réelle diminue) et que la déflation l'aggrave. Les États surendettés tolèrent donc une inflation modérée. L'approche <Em>juridique</Em> observe que la dette s'éteint par le passage du temps si le créancier n'agit pas (prescription). Le taux d'intérêt reste indispensable pour compenser l'inflation : sans lui, le prêteur perdrait systématiquement du pouvoir d'achat.
      </Callout>

      <P><Term>Défis contemporains :</Term> le surendettement mondial (≈ 345 % du PIB en 2022) rend la gestion des taux périlleuse — toute hausse fragilise des économies entières. Les crises récentes (COVID, Ukraine) ont produit une inflation « subie » (coûts de l'énergie) plutôt qu'une inflation de demande, ce qui paralyse la croissance. Le vieillissement démographique constitue un frein structurel.</P>
    </>
  ),

  "fin1-ii": ({ sectionId }) => (
    <>
      <H level={2}>Chapitre 1 — La réglementation des taux d'intérêts</H>
      <H level={3}>II. Le plafond</H>

      <Pepites sectionId={sectionId} items={[
        <>L'usure était un délit pénal de 1804 à 2003 : <Mask>dépénalisation en 2003</Mask> sous la pression du lobby pour s'aligner sur la flexibilité anglo-américaine.</>,
        <>Aujourd'hui : <Mask>la liberté est le principe, la protection l'exception</Mask> — personnes morales libres, particuliers et découverts seuls protégés.</>,
        <>Calcul du taux d'usure : taux moyen pratiqué + <Mask>marge d'un tiers</Mask>.</>,
        <>Sanction <Mask>paradoxalement avantageuse pour le prêteur</Mask> : avec usure, restitution de la part au-dessus du plafond ; sans usure, restitution de la différence avec le taux légal.</>,
        <><Cas>Cass. crim. 3 nov. 2005</Cas> : application rétroactive de la dépénalisation au nom de la <Mask>rétroactivité in mitius</Mask> — emprunteurs perdent leur protection pénale.</>,
      ]} />

      <P>L'État peut-il limiter le montant des taux, ou cela relève-t-il de la liberté bancaire ? La question agite l'histoire des religions : judaïsme, christianisme et islam ont historiquement interdit l'intérêt — « le temps appartient à Dieu », le faire payer serait blasphème. Aujourd'hui seul l'islam maintient l'interdit (recours aux <Em>sukuk</Em>).</P>

      <Callout kind="prof">
        L'intérêt est légitime car il protège le prêteur contre le <Term>gain manqué</Term> (coût d'opportunité — il aurait pu placer son argent ailleurs) et le <Term>préjudice subi</Term> (inflation). Saint Thomas d'Aquin l'avait déjà argumenté.
      </Callout>

      <Callout kind="tension" title="Modèle anglo-américain (refus du plafond)">
        John Locke a fondé la doctrine : la propriété privée et l'accumulation illimitée ne sont pas injustes ; un prix est juste dès lors qu'il y a accord volontaire. Léo Strauss reprend la formule : <Em>« la cupidité, si elle est convenablement orientée, est éminemment profitable »</Em>. Conséquence pratique : les <Em>High Yield Bonds</Em> à 30-50 % sont légaux, le crédit usuraire est juridiquement possible.
      </Callout>

      <H level={4}>L'évolution française : la dépénalisation de 2003</H>
      <P>De 1804 à 2003, l'usure était un délit pénal. Sous la pression du lobby bancaire (effondrement du cours des banques après 2000), la France a dépénalisé l'usure pour s'aligner sur la flexibilité anglo-américaine.</P>

      <P>Aujourd'hui, <Term>la liberté est le principe, la protection l'exception</Term>. Liberté totale pour les personnes morales (entreprises, hôpitaux, communes) ; protection maintenue uniquement pour les particuliers (prêts non professionnels) et les découverts en compte. Le taux d'usure se calcule par référence à un taux moyen + une marge d'un tiers.</P>

      <H level={4}>Sanctions selon le caractère usuraire</H>
      <DataTable
        headers={["Type d'intérêt illégal", "Sanction", "Effet"]}
        rows={[
          ["Avec usure", "Restitution de la part au-dessus du plafond", "Les intérêts usuraires s'imputent d'abord sur les intérêts dus ; le prêteur garde son droit aux intérêts dans la limite du plafond — système paradoxalement avantageux pour le prêteur."],
          ["Sans usure (taux mal fixé)", "Restitution de la différence avec le taux légal", "Les intérêts indus s'imputent sur le capital — bien plus favorable à l'emprunteur."],
        ]}
      />

      <P><Cas>Cass. 3ème civ. 24 juin 2021</Cas> sanctionne les <Em>ventes à réméré</Em> qui dissimulent un prêt usuraire. <Cas>Cass. crim. 3 nov. 2005</Cas>, au nom de la rétroactivité <Em>in mitius</Em>, a appliqué la dépénalisation aux contrats en cours : des emprunteurs ont ainsi perdu rétroactivement leur protection pénale.</P>
    </>
  ),

  "fin1-iii": ({ sectionId }) => (
    <>
      <H level={2}>Chapitre 1 — La réglementation des taux d'intérêts</H>
      <H level={3}>III. Le mode de calcul — le TAEG</H>

      <Pepites sectionId={sectionId} items={[
        <>TAEG (<Art>L.314-5 C. cons.</Art>) = <Mask>coût réel et total du crédit</Mask>. Doit comprendre l'intérêt conventionnel + tous frais conditionnant l'octroi.</>,
        <>Le TAEG par tranches est <Mask>interdit</Mask> : il doit être unique sur toute la durée. Tout frais conditionnant l'octroi doit être inclus.</>,
        <><Cas>Cass. Civ. 1ère 1er oct. 2014</Cas> : <Mask>règle de la décimale</Mask> — sous une erreur de 0,1 ou un taux &lt; 7,2 %, banque mathématiquement à l'abri.</>,
        <><Cas>CJUE 13 février 2025</Cas> : invalide la théorie de la décimale — le TAEG doit être <Mask>exact</Mask>, peu importe que l'inexactitude soit mineure.</>,
        <>Sanctions : <Mask>déchéance</Mask> (conso, crédit gratuit rétroactif) vs <Mask>nullité</Mask> (autres, taux légal). <Cas>Cass. com. 13 mai 2014</Cas> : exception de nullité perpétuelle refusée.</>,
      ]} />

      <P>Le <Term>Taux Annuel Effectif Global</Term> est le coût réel et total du crédit. Depuis la dépénalisation de 2003, c'est lui qui assume la fonction protectrice : <Term>l'information remplace la répression</Term>.</P>

      <P>Deux règles cardinales : tout écrit constatant un crédit doit l'indiquer (<Art>L.314-5 C. cons.</Art>), et le TAEG comprend l'intérêt conventionnel + tous les frais conditionnant l'octroi du crédit.</P>

      <P>Avant la réforme Macron, l'absence ou l'erreur entraînait automatiquement la déchéance des intérêts conventionnels au profit du taux légal. <Term>Aujourd'hui</Term> : l'absence totale de TAEG appelle toujours la substitution du taux légal, mais le TAEG erroné n'entraîne plus de sanction automatique.</P>

      <H level={4}>A. Frais à intégrer</H>
      <P>Tout frais conditionnant l'octroi du crédit doit être inclus : frais de forçage (<Cas>Com. 30 oct. 2012</Cas>), frais d'assurance obligatoire, assurance-vie imposée comme garantie (<Cas>Civ. 1ère 20 janv. 2021</Cas>), effort d'épargne. Le TAEG par tranches est interdit : il doit être unique sur toute la durée.</P>

      <H level={4}>B. Le scandale de l'année lombarde</H>
      <P>L'<Term>année lombarde</Term> est un usage médiéval consistant à calculer les intérêts sur 360 jours (12 × 30) au lieu de 365. Le diviseur étant plus petit, l'intérêt quotidien est plus élevé.</P>

      <DataTable
        headers={["Étape", "Solution"]}
        rows={[
          [<Cas>Com. 17 janv. 2006</Cas>, "Interdiction : il fausse le TAEG, substitution automatique."],
          [<Cas>Com. 24 mars 2009</Cas>, "Revirement : légale si stipulée expressément."],
          [<Cas>CJUE 15 mars 2012</Cas>, "Censure : clause abusive, déchéance des intérêts."],
          [<Cas>Civ. 1ère 1er oct. 2014</Cas>, <><Term>Contournement protecteur des banques.</Term> Charge de la preuve sur l'emprunteur et règle de la décimale : tant que l'erreur est inférieure à 0,1, aucune sanction. Tant que le taux est &lt; 7,2 %, les banques sont mathématiquement à l'abri.</>],
          [<Cas>CJUE 13 février 2025</Cas>, "Rappel à l'ordre : le TAEG doit être exact, peu importe que l'inexactitude soit mineure. Théorie française de la décimale invalidée — sans effet en France pour l'instant."],
        ]}
      />

      <H level={4}>C. Prescription et action en restitution</H>
      <P>La sanction varie selon le type de crédit : <Term>déchéance</Term> pour les crédits à la consommation (crédit gratuit rétroactivement), <Term>nullité</Term> pour les autres (taux légal).</P>

      <DataTable
        headers={["Type de crédit", "Délai", "Point de départ"]}
        rows={[
          ["Droit commun", "5 ans (prescription)", "Conclusion du contrat (fixe)"],
          ["Crédit à la conso", "2 ans (forclusion)", <>Découverte de l'erreur (<Term>flottant</Term>) depuis <Cas>1ère civ. 9 déc. 2020</Cas></>],
        ]}
      />

      <P>L'<Term>exception de nullité perpétuelle</Term> est refusée en matière de TAEG : dès qu'il y a eu début d'exécution, la nullité ne peut plus être invoquée (<Cas>Com. 13 mai 2014</Cas>).</P>
    </>
  ),

  "fin1-d": ({ sectionId }) => (
    <>
      <H level={2}>Chapitre 1 — La réglementation des taux d'intérêts</H>
      <H level={3}>D. Le scandale Dexia</H>

      <Pepites sectionId={sectionId} items={[
        <>Dexia a vendu aux collectivités des crédits à <Mask>taux variable sans respecter la réglementation TAEG</Mask> — TJ Nanterre 2013 prononce la nullité.</>,
        <>Coût potentiel pour l'État si tous suivent : <Mask>17 milliards d'euros</Mask> — d'où la riposte législative immédiate.</>,
        <><Art>Loi du 29 juillet 2014</Art> : <Mask>validation rétroactive</Mask> de tous les contrats Dexia, manifestement contraire à la CEDH (art. 6 + art. 1 du 1er protocole).</>,
        <><Cas>Cass. com. 6 mars 2019 (Carrière-sur-Seine)</Cas> : la commune obtient gain de cause non sur le droit bancaire neutralisé, mais sur le terrain du <Mask>CGCT</Mask>.</>,
      ]} />

      <P>L'affaire illustre comment l'État peut fausser la loi pour protéger sa propre dette. Lors de la décentralisation Raffarin, l'État a poussé les collectivités à se financer via Dexia, qui leur a vendu des crédits à taux variable sans respecter la réglementation du TAEG.</P>

      <P>En 2013, le TJ de Nanterre prononce la nullité de la stipulation d'intérêt conventionnel à la demande du conseil général de Seine-Saint-Denis. Panique : si tous les organismes publics suivent, le coût pour l'État serait de <Term>17 milliards d'euros</Term>.</P>

      <Callout kind="warn" title="La validation rétroactive">
        La <Art>loi du 29 juillet 2014</Art> (« Loi de sécurisation des contrats de prêts structurés souscrits par une personne morale de droit public ») procède à une <Term>validation rétroactive</Term> de tous les contrats Dexia. Elle est manifestement contraire à la CEDH (article 6 et article 1 du 1er protocole — voir l'affaire du tableau d'amortissement).
      </Callout>

      <P><Cas>Cass. com. 28 mars 2018</Cas> tente de sauver la loi en affirmant que les communes ne sont pas protégées par la CEDH. <Cas>Cass. com. 6 mars 2019 (Carrière-sur-Seine)</Cas> : la commune obtient gain de cause, non sur le droit bancaire neutralisé, mais sur le terrain du droit des collectivités territoriales (violation du CGCT).</P>
    </>
  ),

  "fin1-e": ({ sectionId }) => (
    <>
      <H level={2}>Chapitre 1 — La réglementation des taux d'intérêts</H>
      <H level={3}>E. La suppression de la sanction automatique (2019)</H>

      <Pepites sectionId={sectionId} items={[
        <><Art>Ordonnance du 17 juillet 2019</Art> (L.341 et s. C. cons.) : en cas de TAEG erroné, le juge <Mask>peut</Mask> (non plus « doit ») prononcer la perte des intérêts.</>,
        <>Conséquence radicale : la banque peut désormais <Mask>garder la totalité des intérêts conventionnels illégaux</Mask> — TAEG vidé de sa substance d'ordre public.</>,
        <><Cas>Cass. com. 24 mars 2021</Cas> : <Mask>application rétroactive</Mask> de l'ordonnance pourtant non prévue (« uniformiser le régime des sanctions »).</>,
        <>Tactique des banques : <Mask>se désister systématiquement</Mask> avant qu'une question préjudicielle ne soit posée à la CJUE.</>,
      ]} />

      <P>Après la crise de 2008 et l'effondrement du taux légal, le lobby bancaire obtient l'<Art>ordonnance du 17 juillet 2019</Art> (<Art>L.341 et s. C. cons.</Art>). En cas de TAEG erroné ou absent, le juge <Term>peut</Term> (non plus « doit ») prononcer une perte du droit aux intérêts, totale ou partielle.</P>

      <P>La banque peut désormais <Term>garder la totalité des intérêts conventionnels illégaux</Term>. Cass. 1ère civ. 10 juin 2020 confirme que la stipulation reste valable.</P>

      <Callout kind="prof">
        Le TAEG n'est plus une réglementation d'ordre public effective. L'application est même rétroactive (<Cas>Cass. com. 24 mars 2021</Cas>), alors que rien dans l'ordonnance ne le prévoyait — « il apparaît justifié d'uniformiser le régime des sanctions ». La protection de l'emprunteur est ainsi vidée de sa substance.
      </Callout>

      <P>Le sort de l'année lombarde y trouve un nouvel élan : avant 2019, l'exigence d'exactitude jouait pour l'intérêt conventionnel et le TAEG. Désormais seul le TAEG est soumis à la règle de la décimale. Une erreur sur l'intérêt conventionnel ou sur les échéances brisées n'entraîne plus de sanction si le TAEG reste sous 7,2 %. Il devient souvent plus efficace d'agir au pénal pour tromperie. La CJUE n'a pas encore statué : les banques se désistent systématiquement avant qu'une question préjudicielle ne soit posée.</P>
    </>
  ),

  // ============================== CC ==============================
  "cc-intro": ({ sectionId }) => (
    <>
      <H level={2}>Chapitre 2 — Le crédit à la consommation</H>
      <H level={3}>Esprit du régime</H>

      <Pepites sectionId={sectionId} items={[
        <><Art>Loi Scrivener du 10 janvier 1978</Art> : régime <Mask>protecteur qui incite à emprunter</Mask> — rupture avec l'autonomie ancienne des contrats.</>,
        <>Directive 2023/2225 (vigueur <Mask>20 novembre 2026</Mask>) : extension aux LOA, seuil relevé à 100 000 €, contrôle de solvabilité renforcé.</>,
        <>Sociologie du crédit (Galbraith) : <Mask>« maintenir les besoins légèrement au-dessus des ressources »</Mask> — le crédit comme outil de soumission au travail.</>,
      ]} />

      <P>Avant 1978, le droit commun s'appliquait : contrat de prêt et contrat financé étaient autonomes, et l'échec de l'un n'affectait pas l'autre — ce qui décourageait l'endettement. Sous Giscard, la philosophie devient celle du « tout, tout de suite » : la <Art>loi du 10 janvier 1978</Art> (crédit à la consommation), suivie de la loi du 13 juillet 1979 (immobilier), institue un régime <Term>protecteur</Term> qui <Term>incite à emprunter</Term>.</P>

      <P>La directive 2008/48/CE puis la directive 2023/2225 (transposée par l'ordonnance du 3 septembre 2025, en vigueur le 20 novembre 2026) modernisent le régime en l'étendant aux LOA, en relevant le seuil à 100 000 €, en renforçant le contrôle de solvabilité et le devoir de mise en garde, et en supprimant le <Em>no man's land juridique</Em>.</P>

      <Callout kind="prof" title="Sociologie du crédit (Galbraith)">
        « L'idéal est de maintenir les besoins du consommateur légèrement au-dessus de ses ressources : on le soumet alors à des tentations qui le contraignent à s'endetter ; la pression des dettes fait de lui un travailleur encore plus sûr ». Les gens vivent avec un « manteau de dette ». Pour Aron, le capitalisme risque l'autodestruction par déséquilibre entre production et répartition — mais la création monétaire et le crédit ont permis jusqu'ici d'absorber la production.
      </Callout>
    </>
  ),

  "cc-i": ({ sectionId }) => (
    <>
      <H level={2}>Chapitre 2 — Le crédit à la consommation</H>
      <H level={3}>I. Le champ d'application</H>

      <Pepites sectionId={sectionId} items={[
        <>Conditions cumulatives (<Art>L.312-1 et s. C. cons.</Art>) : finalité <Mask>non professionnelle</Mask> + montant jusqu'à <Mask>75 000 €</Mask> (100 000 € à compter de novembre 2026).</>,
        <>Critère décisif de bascule vers l'immobilier : <Mask>ce n'est pas le montant mais la garantie</Mask> — hypothèque ou sûreté équivalente sur immeuble d'habitation.</>,
        <><Cas>CJUE 21 déc. 2023</Cas> : la <Mask>LOA</Mask> est dans le périmètre, le leasing sans option d'achat ne bénéficie pas de la protection.</>,
        <><Cas>Cass. 1ère civ. 1er mars 2023</Cas> : pour les crédits mixtes, on retient la <Mask>finalité dominante</Mask> — refus du cumul des régimes.</>,
      ]} />

      <P>L'enjeu de qualification est décisif : si on est dans le crédit à la consommation, le formalisme est rigoureux et la sanction du non-respect est radicale (le crédit devient gratuit, restitution rétroactive, délai de contestation de 2 ans en forclusion).</P>

      <P>Les <Art>L.312-1 et s. C. cons.</Art> fixent les conditions cumulatives : finalité <Em>non professionnelle</Em> (l'inscription en compte professionnel exclut la qualification) et montant <Em>jusqu'à 75 000 €</Em> (100 000 € à compter de novembre 2026).</P>

      <H level={4}>Difficultés</H>
      <P>La <Term>LOA</Term> est désormais incluse dans le périmètre, mais le leasing sans option d'achat ne bénéficie pas de la protection (<Cas>CJUE 21 déc. 2023</Cas>). Le crédit affecté (finalité connue, ex. achat d'une voiture) bénéficie d'une protection renforcée.</P>

      <P>Pour les <Term>crédits mixtes</Term> (<Cas>1ère civ. 1er mars 2023</Cas> — 3,8 M€ regroupant immobilier, trésorerie et assurance-vie), la Cass refuse le cumul des régimes : on retient la finalité dominante.</P>

      <Callout kind="info" title="Critère décisif">
        Ce qui distingue crédit à la consommation et crédit immobilier <Term>n'est pas le montant mais la garantie</Term>. Une garantie hypothécaire (ou équivalente sur immeuble à usage d'habitation) bascule l'opération en immobilier — ce qui pose un piège pour les panneaux photovoltaïques, biens mobiliers en eux-mêmes mais immobilisés par destination.
      </Callout>
    </>
  ),

  "cc-ii": ({ sectionId }) => (
    <>
      <H level={2}>Chapitre 2 — Le crédit à la consommation</H>
      <H level={3}>II. L'offre préalable de crédit (OPC)</H>

      <Pepites sectionId={sectionId} items={[
        <><Mask>FIPEN</Mask> : Fiche d'Information Précontractuelle Européenne Normalisée avec <Mask>14 mentions obligatoires</Mask>.</>,
        <><Cas>CJUE 8 avril 2021</Cas> : les <Mask>clauses de reconnaissance</Mask> sont condamnées — la signature n'est qu'un indice, charge de la preuve sur la banque.</>,
        <>Sanction du non-respect : <Mask>déchéance des intérêts, crédit gratuit, restitution rétroactive</Mask> — CJUE 2016 juge la sanction proportionnée.</>,
        <><Cas>Cass. 1ère civ. 23 nov. 2022</Cas> : la vérification de solvabilité doit intervenir <Mask>avant le versement</Mask> des fonds, pas avant l'acceptation.</>,
        <><Cas>CJUE 7 décembre 2023</Cas> : la décision d'octroi doit être <Mask>humaine</Mask> — interdiction des décisions automatisées (le scoring est une décision à effet juridique).</>,
      ]} />

      <P>L'OPC est le document détaillé qui permet la comparaison des offres. La directive impose une <Term>FIPEN</Term> (Fiche d'Information Précontractuelle Européenne Normalisée) avec 14 mentions obligatoires.</P>

      <P>Les banques avaient inventé des <Em>clauses de reconnaissance</Em> (le client signe avoir reçu l'information). <Cas>CJUE 8 avril 2021</Cas> les a condamnées : la signature n'est qu'un indice, la charge de la preuve repose sur la banque. <Cas>Civ. 1ère 7 juin 2023</Cas> s'aligne et exige la signature du client sur la fiche elle-même.</P>

      <Callout kind="warn" title="Sanction du non-respect">
        Déchéance des intérêts, crédit gratuit, restitution rétroactive. La CJUE (2016) juge la sanction proportionnée. La déchéance s'applique à toute irrégularité (assurance, encadré, mensualités erronées). Depuis la directive de 2008, seule la modification du <Em>montant</Em> du crédit oblige à émettre une nouvelle OPC, plus la modification du seul taux.
      </Callout>

      <H level={4}>Solvabilité du candidat</H>
      <P>La banque doit vérifier la solvabilité et en conserver la preuve (<Art>L.312-16 s.</Art>). <Cas>1ère civ. 23 nov. 2022</Cas> : la vérification doit intervenir avant le <Em>versement</Em> des fonds, pas avant l'acceptation.</P>

      <P>Surtout, <Cas>CJUE 7 décembre 2023</Cas> : la décision d'octroi doit être <Term>humaine</Term> — interdiction des décisions automatisées (le scoring est en lui-même une décision à effet juridique). Cette jurisprudence aura des effets considérables sur les pratiques bancaires.</P>
    </>
  ),

  "cc-iii": ({ sectionId }) => (
    <>
      <H level={2}>Chapitre 2 — Le crédit à la consommation</H>
      <H level={3}>III. La durée de l'OPC</H>

      <Pepites sectionId={sectionId} items={[
        <>Maintien obligatoire de l'offre pendant <Mask>15 jours</Mask> (<Art>L.312-18</Art>). Délai de rétractation de <Mask>14 jours</Mask> depuis la directive 2008.</>,
        <>Sans date, l'OPC est <Mask>nulle</Mask> et les intérêts déchus. <Cas>CA Douai 24 mai 2005</Cas> admet en revanche la fausse date pour purger le délai.</>,
        <>Revirement 2020 sous influence CJUE : la banque doit <Mask>prouver la remise et la conformité</Mask> du bordereau de rétractation (signature = simple indice).</>,
      ]} />

      <P>La banque doit maintenir l'offre pendant au moins <Term>15 jours</Term> (<Art>L.312-18</Art>). Si le client accepte, il dispose d'un droit de rétractation de <Term>14 jours</Term> (depuis la directive de 2008 ; auparavant 7 jours, ce qui créait un « no man's land juridique » entre l'expiration du délai de rétractation et la libération des fonds). À compter de novembre 2026, la suppression du no man's land permettra à la banque de libérer les fonds dès l'acceptation.</P>

      <H level={4}>Datage de l'OPC</H>
      <P>Sans date, l'OPC est nulle et les intérêts déchus. <Cas>CA Douai 24 mai 2005</Cas> admet en revanche la fausse date pour purger le délai de rétractation.</P>

      <P>Pour le bordereau de rétractation, la Cass avait fait peser la preuve de l'irrégularité sur l'emprunteur (2013). <Term>Revirement en 2020 sous influence CJUE</Term> : la banque doit prouver la remise et la conformité du bordereau, la signature d'une clause type n'étant qu'un indice.</P>
    </>
  ),

  "cc-iv": ({ sectionId }) => (
    <>
      <H level={2}>Chapitre 2 — Le crédit à la consommation</H>
      <H level={3}>IV. L'interdépendance des deux contrats</H>

      <Pepites sectionId={sectionId} items={[
        <>Loi Scrivener 1978 : <Mask>interdépendance</Mask> entre crédit et contrat financé — la nullité de l'un entraîne celle de l'autre.</>,
        <><Cas>CJCE 4 oct. 2007</Cas> : l'interdépendance est <Mask>automatique</Mask>, joue même sans mention de l'usage des fonds dans le crédit.</>,
        <><Cas>Civ. 1ère 7 fév. 1995</Cas> : si le bien n'est pas livré, l'emprunteur ne doit rien — mais le crédit doit être exécuté <Mask>tant que le juge n'a pas statué</Mask>.</>,
        <><Cas>Affaire chauffe-eau, 1ère civ. 16 janv. 2013</Cas> : la banque qui débloque les fonds <Mask>avant livraison complète</Mask> commet une faute — emprunteur libéré.</>,
        <><Cas>Cass. 6 fév. 2019</Cas> : si la <Mask>demande de restitution du capital</Mask> n'est pas expressément formulée, elle ne peut être ordonnée — vigilance procédurale.</>,
      ]} />

      <P>La loi Scrivener de 1978 a renversé le droit commun en imposant une <Term>interdépendance</Term> entre le contrat de crédit et le contrat financé : la nullité de l'un entraîne celle de l'autre.</P>

      <P><Cas>CJCE 4 oct. 2007</Cas> : l'interdépendance est <Term>automatique</Term>, elle joue même sans mention de l'usage des fonds dans le crédit. <Cas>Civ. 1ère 13 mars 2008</Cas> : pour le crédit affecté, le montant du prêt ne peut excéder celui du contrat principal sous peine de nullité ; les obligations de l'emprunteur ne naissent qu'à compter de l'exécution du contrat principal (livraison).</P>

      <P>Si le bien n'est pas livré, l'emprunteur ne doit rien (<Cas>Civ. 1ère 7 fév. 1995</Cas>). <Term>Mais</Term> tant que le juge n'a pas statué, le crédit doit être exécuté — l'interdépendance est neutralisée pour des raisons judiciaires. La parade : l'avocat doit demander la suspension du crédit pendant l'instance et appeler la banque à la procédure (<Art>L.312-55</Art>).</P>

      <H level={4}>La faute du vendeur et la faute du banquier</H>
      <P>L'enjeu : <Term>qui supporte le risque économique en cas de défaillance du vendeur ?</Term> Si le banquier n'a commis aucune faute, le risque pèse entièrement sur l'emprunteur. L'avocat de l'emprunteur cherche donc à caractériser la faute bancaire.</P>

      <P>L'arrêt majeur est l'<Cas>Affaire du chauffe-eau, 1ère civ. 16 janv. 2013</Cas> : la banque qui a débloqué les fonds en intégralité avant la livraison complète du matériel a commis une faute — elle aurait dû attendre la preuve de l'exécution complète. L'emprunteur est libéré.</P>

      <P><Cas>Cass. 1ère civ. 25 nov. 2020</Cas> : pour obtenir réparation, l'emprunteur doit prouver le préjudice causé par la faute. <Cas>Cass. 6 fév. 2019</Cas> : si la demande de restitution du capital n'est pas expressément formulée, elle ne peut être ordonnée — vigilance procédurale absolue.</P>
    </>
  ),

  "cc-v": ({ sectionId }) => (
    <>
      <H level={2}>Chapitre 2 — Le crédit à la consommation</H>
      <H level={3}>V. La protection de l'emprunteur en cours d'exécution</H>

      <Pepites sectionId={sectionId} items={[
        <>Remboursement anticipé (<Art>L.312-34 C. cons.</Art>, vigueur 20 nov. 2026) : pas de pénalité si capital remboursé <Mask>&lt; 10 000 €</Mask>, pénalité plafonnée au-delà.</>,
        <><Mask>Triple peine</Mask> de l'emprunteur défaillant (<Art>L.312-39</Art>) : exigibilité immédiate du capital + intérêts conventionnels + indemnité barémique.</>,
        <>Délai de grâce de <Mask>2 ans</Mask> (<Art>art. 1343-5 CC</Art>) : tant qu'il joue, l'emprunteur n'est plus juridiquement défaillant — la banque ne peut prononcer la déchéance.</>,
        <><Cas>Cass. 1ère civ. avis du 8 oct. 2025</Cas> : clause de dispense de MED licite <Mask>SAUF</Mask> si la déchéance ne dépend pas de l'inexécution d'une obligation essentielle.</>,
        <>Divergence avec <Cas>CJUE Banco Primus 26 janvier 2017</Cas> : les clauses de dispense de MED sont <Mask>abusives par principe</Mask> — divergence à surveiller.</>,
      ]} />

      <H level={4}>1. L'emprunteur solvable : le remboursement anticipé</H>
      <DataTable
        headers={["Période", "Régime"]}
        rows={[
          [<Term>Avant 2008</Term>, "Le droit commun permet à la banque d'interdire le remboursement anticipé. En crédit à la consommation, la loi de 1978 imposait un remboursement anticipé légal et gratuit."],
          [<Term>Depuis 2008</Term>, "Directive 2008 : remboursement anticipé de droit, mais pénalité plafonnée admise."],
          [<Term>À partir du 20 novembre 2026</Term>, <><Art>L.312-34 C. cons.</Art> : pas de pénalité si le capital remboursé est inférieur à 10 000 €, pénalité au-delà.</>],
        ]}
      />

      <H level={4}>2. L'emprunteur défaillant</H>
      <P>L'<Art>article L.312-39 C. cons.</Art> organise une véritable <Term>triple peine</Term> : exigibilité immédiate du capital restant dû, intérêts conventionnels jusqu'au paiement, et indemnité barémique. La défaillance sur une seule échéance déclenche tout.</P>

      <P>La parade pour l'emprunteur de bonne foi : saisir le juge ou la commission de surendettement pour obtenir un aménagement, ou solliciter un délai de grâce de <Term>deux ans</Term> (<Art>art. 1343-5 CC</Art>). Tant que le délai joue, l'emprunteur n'est plus juridiquement défaillant et la banque ne peut prononcer la déchéance.</P>

      <H level={4}>Déchéance du terme et mise en demeure</H>
      <P>L'obligation de mise en demeure est en principe d'ordre public. <Cas>1ère civ., avis du 8 oct. 2025</Cas> : une clause de dispense est licite <Em>sauf</Em> si la déchéance ne dépend pas de l'inexécution d'une obligation essentielle — auquel cas la clause est abusive.</P>

      <P>Cette position diverge de celle de la CJUE (<Cas>Affaire Banco Primus, 26 janvier 2017</Cas>) qui considère que les clauses de dispense de MED sont abusives par principe — divergence à surveiller.</P>

      <Callout kind="info" title="Quatre règles complémentaires sur la MED">
        <ul style={{ margin: 0, paddingLeft: 20 }}>
          <li>La MED n'a pas d'effet interruptif de prescription (<Cas>Cass. com. 18 mai 2022</Cas>).</li>
          <li>La dispense joue pour l'emprunteur de mauvaise foi ou les sociétés.</li>
          <li>La lettre recommandée non réclamée n'affecte pas l'efficacité de la MED.</li>
          <li>Les pratiques d'intimidation par les agences de recouvrement (filiales bancaires) constituent un abus de droit (<Cas>TJ Nogent-sur-Marne, 1er mars 2022</Cas>).</li>
        </ul>
      </Callout>
    </>
  ),

  "cc-vi": ({ sectionId }) => (
    <>
      <H level={2}>Chapitre 2 — Le crédit à la consommation</H>
      <H level={3}>VI. L'office du juge et la forclusion</H>

      <Pepites sectionId={sectionId} items={[
        <><Cas>CJUE 21 avril 2016</Cas> : l'office du juge est un <Mask>devoir</Mask>, non une faculté, et porte sur tous les éléments — y compris l'examen des pièces.</>,
        <>Action en requalification de clause abusive <Mask>imprescriptible</Mask> — mais demande de restitution prescriptible 5 ans à compter de la décision retenant l'abus.</>,
        <><Cas>CJUE 24 mars 2014</Cas> : censure la majoration légale automatique L.313-3 — <Mask>la seule sanction légitime est la gratuité du crédit</Mask>. Cass. 28 juin 2023 s'incline.</>,
        <><Cas>AP 6 juin 2003</Cas> : forclusion à <Mask>point de départ flottant</Mask> à compter du premier incident de paiement non régularisé. Délai de 2 ans.</>,
        <><Cas>Cass. 18 sept. 2019</Cas> : déchéance des intérêts = <Mask>défense au fond imprescriptible</Mask> ; demande reconventionnelle de restitution = prescription 5 ans.</>,
      ]} />

      <H level={4}>A. L'office du juge</H>
      <P>Le contentieux est massif et déséquilibré. La Cass refusait initialement tout office au juge en matière de prescription. La CJCE puis la CJUE ont imposé l'inverse : ces questions sont d'ordre public protecteur, le juge <Term>doit</Term> soulever d'office.</P>

      <P><Cas>1ère civ. 22 janv. 2009</Cas> s'incline. La <Art>loi du 3 janvier 2008</Art> consacre l'office, mal rédigée. <Cas>CJUE 21 avril 2016</Cas> : l'office est un <Term>devoir</Term>, non une faculté, et porte sur tous les éléments — y compris l'examen des pièces. <Cas>1ère civ. 2 fév. 2022</Cas> : le principe de concentration des moyens (Césaréo 2006) ne s'applique pas en crédit à la consommation. La CJUE (30 juin 2022) admet même la compensation d'office.</P>

      <H level={4}>Sur les clauses abusives</H>
      <P>La qualification est <Em>divisible</Em> (la qualification peut être partielle, seule la portion litigieuse tombe). L'action en requalification est <Term>imprescriptible</Term>. Mais la demande de restitution des intérêts indus reste prescriptible (5 ans à compter de la décision retenant le caractère abusif — <Cas>CJUE puis Cass. 12 juillet 2023</Cas>).</P>

      <Callout kind="info" title="Une affaire emblématique">
        Le <Cas>TI Nogent-sur-Marne, 7 déc. 2010</Cas> concerne une chômeuse poursuivie par Finaref pour un crédit initial de 1 524 € contracté en 1995, devenu 8 000 € avec les intérêts. Le juge soulève d'office la forclusion (depuis 1998) et la déchéance des intérêts pour irrégularité de l'OPC. C'est tout l'esprit du dispositif protecteur.
      </Callout>

      <P>Sur la majoration légale automatique du taux en cas de défaillance (<Art>L.313-3 CMF</Art>, + 5 points), <Cas>CJUE 24 mars 2014</Cas> a censuré la France : le banquier négligent doit être sanctionné, la sanction doit être dissuasive — la seule sanction légitime est la gratuité du crédit. <Cas>Cass. 28 juin 2023</Cas> s'incline.</P>

      <H level={4}>B. La forclusion</H>
      <P>L'idée : dans les contentieux de masse, des délais courts (2 ans) évitent leur accumulation. <Cas>AP 6 juin 2003</Cas> : point de départ <Term>flottant</Term>, à compter du premier incident de paiement non régularisé.</P>

      <P><Term>Neutralisation.</Term> Le délai de grâce, le différé de remboursement et le découvert tacite reportent le point de départ. La procédure de surendettement, en principe, ne le reporte <Em>pas</Em> — sauf si la commission octroie un moratoire. <Cas>Cass. 23 octobre 2025</Cas> : l'octroi d'un moratoire entraîne une suspension par interruption — au terme du moratoire, le temps déjà couru est conservé.</P>

      <P><Cas>Cass. 18 sept. 2019</Cas> a tranché un débat structurant : la déchéance du droit aux intérêts est une <Term>défense au fond</Term> (donc imprescriptible) ; mais formulée comme une demande reconventionnelle (restitution d'intérêts), elle est soumise à la prescription de droit commun de 5 ans.</P>
    </>
  ),

  // ============================== CI ==============================
  "ci-intro": ({ sectionId }) => (
    <>
      <H level={2}>Chapitre 3 — Le crédit immobilier</H>
      <H level={3}>Modèles & enjeux</H>

      <Pepites sectionId={sectionId} items={[
        <>France vs USA : <Mask>taux fixe vs variable</Mask> ; solvabilité actuelle vs valeur future ; logique assurantielle vs hypothèque ; <Mask>dette persiste</Mask> après saisie vs effacée.</>,
        <>Haut Comité pour la Stabilité Financière 2022 : seuil de solvabilité relevé de 25 à <Mask>35 % du revenu brut</Mask>. Plafond légal de durée : <Mask>30 ans</Mask> (décret 25 juillet 2025).</>,
        <><Cas>CJUE 17 mai 2022</Cas> : <Mask>le JEX peut désormais contrôler d'office les clauses abusives</Mask> sur tout titre exécutoire, y compris notarié et même définitif — révolution silencieuse.</>,
        <>L'OCDE estime que la <Mask>bulle immobilière</Mask> est responsable de la moitié de la perte de compétitivité française des années 2000-2010.</>,
      ]} />

      <P>L'enjeu est macroéconomique : l'immobilier soutient la croissance, et toutes les politiques françaises favorisent l'achat à crédit (les élus sont eux-mêmes propriétaires). Après le krach immobilier de 1990-1996 puis le krach boursier de 2000, l'État a orienté l'épargne vers la pierre, fabriquant une bulle immobilière dont l'OCDE estime qu'elle est responsable de la moitié de la perte de compétitivité française des années 2000-2010.</P>

      <P>Pour la maintenir, le <Term>Haut Comité pour la Stabilité Financière</Term> a relevé en 2022 le seuil de solvabilité de 25 à 35 % du revenu brut, et la durée moyenne des crédits est passée de 10 à 25-30 ans (plafond légal de 30 ans depuis le décret du 25 juillet 2025).</P>

      <H level={4}>France vs. États-Unis : cinq différences fondamentales</H>
      <DataTable
        headers={["Critère", "Modèle américain", "Modèle français"]}
        rows={[
          ["Taux d'intérêt", "Variable", "Fixe"],
          ["Solvabilité", "Évaluée sur la valeur future du bien", "Évaluée sur la solvabilité actuelle"],
          ["Garanties", "Hypothèque (dépendante du bien)", "Logique assurantielle, indépendante du bien"],
          ["Défaillance", "Saisie du bien, dette effacée — repart à zéro", "Saisie possible mais la dette subsiste si le bien ne couvre pas tout. Imprescriptible et transmissible aux héritiers"],
          ["Titrisation", "Commune aux deux. Risque illustré par les subprimes.", <><Cas>Cass. 15 juin 2022</Cas> : prix de cession peut être inférieur à la valeur nominale, ouvre un droit de retrait litigieux (art. 1699 CC).</>],
        ]}
      />

      <H level={4}>La crise des saisies immobilières et le revirement de 2022</H>
      <P>À partir de 2010, les banques utilisent les actes notariés (titres exécutoires) pour saisir directement, sans contrôle judiciaire, en se prévalant de clauses résolutoires triggers (déménagement, maladie, départ à la retraite). La CJUE avait initialement validé.</P>

      <Callout kind="info" title="Révolution silencieuse du droit de l'exécution">
        <Cas>Revirement majeur : CJUE 17 mai 2022</Cas> (suivi par Cass. com. et civ. 2023) — le <Term>JEX peut désormais contrôler d'office les clauses abusives</Term> lors de la mise en œuvre de tout titre exécutoire, y compris notarié et même définitif. Si une clause résolutoire est jugée abusive, la saisie est nulle, alors même qu'elle s'appuie sur une décision revêtue de l'autorité de la chose jugée.
      </Callout>
    </>
  ),

  "ci-i": ({ sectionId }) => (
    <>
      <H level={2}>Chapitre 3 — Le crédit immobilier</H>
      <H level={3}>I. Le champ d'application</H>

      <Pepites sectionId={sectionId} items={[
        <><Art>Loi Scrivener 1979</Art> (<Art>L.313-1 et s. C. cons.</Art>) : crédits immobiliers non professionnels à partir de <Mask>75 000 €</Mask>, ou tout montant si <Mask>hypothèque</Mask> sur immeuble d'habitation.</>,
        <>Directive 2014 : deux étages — mise en garde générale (<Art>L.312-12</Art>) et mise en garde <Mask>renforcée</Mask> pour emprunteurs profanes (<Art>L.313-11</Art>).</>,
        <>Le <Mask>gage sur immeuble par destination</Mask> (art. 2334 CC, ord. 2008) : un gage portant sur des panneaux photovoltaïques bascule en crédit immobilier.</>,
      ]} />

      <P>La <Art>loi Scrivener de 1979</Art> (mise à jour par la directive du 4 février 2014, transposée en 2016) institue un régime dérogatoire pour protéger l'emprunteur tout en l'incitant à s'endetter (<Art>L.313-1 et s. C. cons.</Art>).</P>

      <P>S'applique aux crédits finançant un bien immobilier à finalité non professionnelle, à partir de 75 000 € ou — quel que soit le montant — dès lors que la garantie est une <Term>hypothèque ou sûreté équivalente</Term> sur immeuble à usage d'habitation. L'ordonnance de 2008 a créé le <Em>gage sur immeuble par destination</Em> (art. 2334 CC) : un gage portant sur des panneaux photovoltaïques bascule sous le régime du crédit immobilier.</P>

      <P>La <Art>directive de 2014</Art> a alourdi la responsabilité bancaire avec deux étages : une obligation de mise en garde générale (L.312-12) et un devoir de mise en garde renforcé pour les emprunteurs profanes (L.313-11). La <Art>loi Habitat dégradé du 9 avril 2024</Art> a créé un emprunt collectif pour financer les travaux de rénovation imposés aux copropriétés.</P>
    </>
  ),

  "ci-ii": ({ sectionId }) => (
    <>
      <H level={2}>Chapitre 3 — Le crédit immobilier</H>
      <H level={3}>II. Le délai de rétractation</H>

      <Pepites sectionId={sectionId} items={[
        <><Art>L.313-34</Art> : délai de rétractation de <Mask>10 jours</Mask> à compter de la réception de l'offre. Sanction : nullité relative (prescription 5 ans).</>,
        <>Pendant ces 10 jours : <Mask>no man's land juridique</Mask> — aucun versement possible (L.313-35) sous peine d'amende de <Mask>300 000 €</Mask> (loi Hamon 2014).</>,
        <>Combinaison avec <Art>loi SRU 2000</Art> (L.271-1 CCH) : 10 jours supplémentaires sur la vente. Depuis 2022, <Mask>mail au notaire</Mask> vaut LRAR.</>,
      ]} />

      <P><Art>L.313-34</Art> : délai de <Term>10 jours</Term> à compter de la réception de l'offre. Sanction : nullité relative (prescription 5 ans), couvrable par l'emprunteur. L'acceptation doit être faite par lettre, à défaut déchéance des intérêts. La banque doit maintenir l'offre pendant 30 jours.</P>

      <P>Pendant les 10 jours, <Em>no man's land juridique</Em> — aucun versement n'est possible (<Art>L.313-35</Art>) sous peine de nullité relative et d'amende de <Term>300 000 €</Term> (loi Hamon 2014).</P>

      <H level={4}>Combinaison avec la loi SRU</H>
      <P>La <Art>loi SRU 2000</Art> (<Art>L.271-1 CCH</Art>) a ajouté un droit de rétractation de 10 jours portant sur la vente elle-même, qui se combine avec celui du crédit. La Cass a successivement protégé puis assoupli puis reprotégé l'acheteur : la remise en main propre par le notaire ne purgeait pas le délai (<Cas>Cass. 2011</Cas>), la loi Macron de 2015 a légalisé cette pratique, mais la Cass a multiplié les exigences procédurales (vérification de l'identité du signataire, mandat exprès du tiers, mail au notaire valant LRAR depuis 2022).</P>
    </>
  ),

  "ci-iii": ({ sectionId }) => (
    <>
      <H level={2}>Chapitre 3 — Le crédit immobilier</H>
      <H level={3}>III. L'OPC immobilière (L.313-25)</H>

      <Pepites sectionId={sectionId} items={[
        <><Art>L.313-25</Art> : la déchéance des intérêts pour irrégularité <Mask>n'est pas automatique</Mask> (différence majeure avec crédit conso). Cass. 16 janv. 2013 : juge doit motiver.</>,
        <><Art>Loi PACTE 2019</Art> : <Mask>abrogation</Mask> de l'encadrement à 10 ans des clauses de domiciliation, sous pression du lobby — alors que <Cas>CJUE 15 oct. 2020</Cas> validait l'encadrement.</>,
        <>Tableau d'amortissement : <Cas>Cass. 16 mars 1994</Cas> impose sa fourniture, <Art>loi du 12 avril 1996</Art> opère une <Mask>validation rétroactive</Mask> protégeant les banques.</>,
        <><Cas>CEDH 14 février 2006</Cas> condamne fermement la France : <Mask>l'intérêt des banques n'est pas l'intérêt général</Mask>. Cass. cède le 15 décembre 2011.</>,
        <>Stratégie procédurale : <Mask>QPC</Mask> (sans rétroactivité), <Mask>CEDH</Mask> (réparation partielle), <Mask>CJUE</Mask> (effet immédiat) — la voie européenne est la plus protectrice.</>,
      ]} />

      <P>L'OPC doit détailler le prêt et respecter le formalisme imposé par la directive 2014 (FISE). En cas d'irrégularité, la déchéance des intérêts <Term>n'est pas automatique</Term> (différence majeure avec le crédit à la consommation). <Cas>Cass. 16 janv. 2013</Cas> : le juge doit motiver la sanction (totale, partielle, aucune), à défaut cassation. Absence ou fausse date : déchéance + amende de 300 000 €.</P>

      <H level={4}>Atteinte à la mobilité bancaire — les clauses de domiciliation</H>
      <P>Pour conditionner l'octroi à un transfert de tous les comptes, l'ordonnance du 1er juin 2017 (L.313-25-1) avait limité la durée à 10 ans. La <Art>loi PACTE de 2019</Art> l'a abrogée sous la pression du lobby. La <Cas>CJUE (15 octobre 2020)</Cas> avait pourtant validé l'encadrement français — décision arrivée trop tard.</P>

      <H level={4}>Le scandale du tableau d'amortissement</H>
      <P>Affaire en huit épisodes qui illustre la tension entre intérêt général et protection des banques par l'État. Sur les longs crédits, après 11 ans sur un prêt de 30 ans, il peut rester 80 % du capital à rembourser : le <Term>tableau d'amortissement</Term> est essentiel.</P>

      <P>Après le krach de 1990, des emprunteurs contestent l'absence de tableau (la loi Scrivener ne l'imposait pas). <Cas>Cass. 16 mars 1994</Cas> : sans tableau, le crédit est gratuit et les intérêts restituables. La <Art>loi de validation rétroactive du 12 avril 1996</Art> met fin aux actions tout en rendant le tableau obligatoire pour l'avenir.</P>

      <P>La <Cas>Cass. (Civ. 6 janv. 1998)</Cas> rétablit la protection : la renégociation impose une nouvelle OPC avec tableau, à défaut crédit gratuit. La <Art>loi de sécurité financière du 25 juin 1999</Art> (L.313-39) crée alors un régime aux deux visages : la renégociation suit le formalisme allégé d'un avenant — délai de 10 jours, tableau d'amortissement — mais la sanction n'est pas la déchéance des intérêts. La Cass a finalement refusé toute sanction (2007, 2011, 2015).</P>

      <Callout kind="warn" title="L'épisode CEDH">
        Les emprunteurs ont attaqué la loi de validation rétroactive comme contraire à la CEDH (article 6 et article 1 du 1er protocole). La Cass (1ère civ. 20 juin 2000) avait sauvé la loi en invoquant l'« intérêt général » du système bancaire. <Cas>CEDH 14 février 2006</Cas> condamne fermement la France : <Term>l'intérêt des banques n'est pas l'intérêt général</Term>, la loi est une ingérence illégale. La Cass refuse de s'incliner, invente un critère pour limiter la portée. <Cas>QPC 11 juin 2010</Cas> juge ce raisonnement contraire à la Constitution. La Cass cède le 15 décembre 2011.
      </Callout>

      <Callout kind="info" title="Stratégie procédurale (à retenir)">
        Trois voies pour contester une loi inique. Le <Term>Conseil constitutionnel</Term> (QPC) sanctionne avec autorité mais sans rétroactivité. La <Term>CEDH</Term> répare partiellement (DI) et oblige l'État à modifier le texte. La <Term>CJUE</Term> s'impose immédiatement à toutes les juridictions si le droit communautaire est en cause. Les leçons Dexia et tableau d'amortissement montrent que la voie européenne est la plus protectrice.
      </Callout>
    </>
  ),

  "ci-iv": ({ sectionId }) => (
    <>
      <H level={2}>Chapitre 3 — Le crédit immobilier</H>
      <H level={3}>IV. L'interdépendance des deux contrats</H>

      <Pepites sectionId={sectionId} items={[
        <>Mécanisme miroir : offre de crédit sous <Mask>condition résolutoire</Mask> de non-conclusion (<Art>L.313-36</Art>, 4 mois OP) ; vente sous <Mask>condition suspensive</Mask> d'obtention du crédit (<Art>L.313-41</Art>, 1 mois OP).</>,
        <>La condition <Mask>n'est pas potestative</Mask> : l'octroi du crédit ne dépend pas de la volonté de l'emprunteur.</>,
        <><Cas>Civ. 1ère 9 déc. 1992</Cas> : pas de démarches de l'emprunteur = condition <Mask>réputée acquise</Mask> (vente formée).</>,
        <><Cas>Cass. 3ème civ. 14 décembre 2022</Cas> : l'emprunteur peut <Mask>refuser une offre légèrement inférieure</Mask> au montant sans être fautif — la condition est défaillante.</>,
      ]} />

      <P>Mécanisme à deux conditions miroir.</P>

      <DataTable
        headers={["Côté", "Texte", "Condition", "Délai"]}
        rows={[
          ["Offre de crédit", <Art>L.313-36</Art>, <><Term>Condition résolutoire</Term> de la non-conclusion du contrat principal</>, "4 mois (OP)"],
          ["Vente immobilière", <Art>L.313-41</Art>, <><Term>Condition suspensive</Term> de l'obtention du crédit</>, "1 mois (OP)"],
        ]}
      />

      <P>Cette condition n'est <Em>pas potestative</Em> : l'octroi du crédit ne dépend pas de la volonté de l'emprunteur.</P>

      <P>La jurisprudence <Cas>Civ. 1ère 9 déc. 1992</Cas> et la suite balisent les comportements de l'emprunteur :</P>

      <DataTable
        headers={["Comportement", "Effet juridique"]}
        rows={[
          ["Pas de démarches", "La condition est juridiquement réputée acquise (vente formée)."],
          ["Démarches sérieuses qui n'aboutissent pas", "La condition n'est pas acquise (pas de vente, pas de crédit)."],
          ["Démarches pour des stipulations différentes", <>La condition est acquise (<Cas>3ème civ. 30 janv. 2008</Cas>).</>],
          ["Offre légèrement inférieure au montant", <>Position oscillante. <Cas>Cass. 3ème civ. 14 décembre 2022</Cas> admet que l'emprunteur peut refuser sans être fautif — la condition est défaillante.</>],
        ]}
      />
    </>
  ),

  "ci-v": ({ sectionId }) => (
    <>
      <H level={2}>Chapitre 3 — Le crédit immobilier</H>
      <H level={3}>V. Les conséquences de l'interdépendance</H>

      <Pepites sectionId={sectionId} items={[
        <><Art>Article L.313-38</Art> mal rédigé : il vise le cas où l'un des contrats <Mask>« n'est pas conclu »</Mask> — silence sur nullité et résolution.</>,
        <><Cas>Civ. 1ère 1er décembre 1993</Cas> interprète en faveur de l'emprunteur : <Mask>nullité ET résolution</Mask> emportent disparition de l'autre contrat.</>,
        <>Le mécanisme protecteur de l'interdépendance joue ainsi <Mask>au-delà des termes étroits</Mask> du texte — extension prétorienne salutaire.</>,
      ]} />

      <P>L'<Art>article L.313-38</Art> est mal rédigé : il vise le cas où l'un des contrats « n'est pas conclu ». Que faire si le contrat existe mais est nul (vice du consentement) ou résolu ?</P>

      <P><Cas>Civ. 1ère 1er décembre 1993</Cas> interprète en faveur de l'emprunteur : nullité <Em>et</Em> résolution emportent disparition de l'autre contrat. Le mécanisme protecteur joue dans toute son ampleur.</P>
    </>
  ),

  "ci-vi": ({ sectionId }) => (
    <>
      <H level={2}>Chapitre 3 — Le crédit immobilier</H>
      <H level={3}>VI. L'exécution du crédit immobilier</H>

      <Pepites sectionId={sectionId} items={[
        <>Remboursement anticipé : indemnité plafonnée à <Mask>3 % du capital restant dû</Mask> (<Art>L.313-47</Art>) — droit commun très différent (<Cas>Cass. 4 avril 2024</Cas>, congrégation religieuse).</>,
        <>Helvet Immo : crédits libellés en <Mask>francs suisses</Mask> à taux variable — provision BNP de <Mask>720 M€</Mask> en 2023 (condamnation pénale pour tromperie).</>,
        <><Cas>CJUE 10 juin 2021</Cas> : revirement majeur — qualification de clause abusive possible. Triptyque pesant sur la banque : <Mask>bonne foi, transparence, équilibre</Mask>.</>,
        <><Art>Loi du 26 juillet 2013</Art> (L.313-64) : interdit le <Mask>taux variable libellé en devise étrangère</Mask> pour crédits non professionnels (sauf patrimoine ou revenus dans cette devise).</>,
        <><Cas>Cass. 1ère civ. 22 mars 2023</Cas> : un délai d'exécution de <Mask>8 jours seulement</Mask> après MED est abusif — il faut un délai raisonnable, au minimum un mois.</>,
      ]} />

      <H level={4}>A. Le remboursement anticipé</H>
      <P>L'emprunteur protégé bénéficie d'un droit au remboursement anticipé, la banque ne pouvant exiger qu'une indemnité plafonnée à 3 % du capital restant dû (<Art>L.313-47</Art>).</P>

      <P>Le régime de droit commun est très différent : <Cas>FFA, 27 sept. 2005</Cas> (la Fédération française d'athlétisme négocie un crédit à 4 % en remplacement d'un prêt à 10 % ; la banque exige 4 millions de francs d'indemnité) — finalité professionnelle = droit commun, l'indemnité est légale et le juge ne peut la réduire (ce n'est pas une clause pénale). <Cas>Cass. 1ère civ. 4 avril 2024</Cas> étend la solution à une congrégation religieuse.</P>

      <H level={4}>B. Les clauses abusives</H>
      <P>Trois exemples typiques :</P>
      <DataTable
        headers={["Clause", "Sort"]}
        rows={[
          ["Interdiction de louer le bien acheté", <>Clause abusive (atteinte au droit de propriété, <Cas>Cass. 2005</Cas>)</>],
          ["Déchéance pour licenciement", <>Clause abusive (<Cas>Cass. 1ère civ. 5 juin 2019</Cas>)</>],
          ["Déchéance pour déclaration inexacte à la signature", <>Clause abusive (<Cas>1ère civ. 10 oct. 2018</Cas>) — contrairement au crédit à la conso</>],
        ]}
      />

      <H level={4}>C. Le scandale Helvet Immo</H>
      <P>Après le revirement de 1995-1996 sur le taux variable, certaines banques (BNP, Crédit Agricole) ont vendu à des particuliers des crédits libellés en <Term>francs suisses</Term> à taux variable. Tant que l'euro était fort, le mécanisme était indolore. Après 2008, la BCE dévalue l'euro, les taux deviennent négatifs et les échéances explosent.</P>

      <P><Cas>Cass. 2017</Cas> admet que les clauses peuvent être abusives. <Cas>CJUE 20 sept. 2018</Cas> puis <Cas>Cass. 20 fév. 2019</Cas> font volte-face : pas de qualification de clause abusive si elle porte sur un élément essentiel — et le taux est essentiel. Tous les emprunteurs sont condamnés. BNP a néanmoins été condamnée au pénal pour tromperie (provision de <Term>720 M€</Term> en 2023).</P>

      <Callout kind="info" title="Revirement majeur — CJUE 10 juin 2021">
        La Cass cède et revient à la position de 2017 : la qualification de clause abusive est possible, contrôle d'office par le juge, déchéance du terme et remboursement du crédit. La grille d'analyse repose sur un <Term>triptyque pesant sur la banque : bonne foi, transparence, équilibre</Term>, appréciés au regard de l'information de l'emprunteur et du risque disproportionné de change.
      </Callout>

      <P>La <Art>loi du 26 juillet 2013</Art> (L.313-64) interdit désormais en principe le taux variable libellé en devise étrangère pour les crédits non professionnels, sauf si l'emprunteur a son patrimoine ou ses revenus dans cette devise.</P>

      <P>La jurisprudence 2025 va plus loin : même si le crédit était valablement libellé en francs suisses, la banque a manqué à son devoir de mise en garde si elle n'a pas alerté sur le risque de change actuel <Term>et futur</Term>. Le devoir de mise en garde s'étend désormais sur toute la durée du crédit, et non plus seulement à la signature.</P>

      <H level={4}>D. Déchéance anticipée et MED</H>
      <P>Mécanisme similaire au crédit à la consommation. <Cas>1ère civ. 22 mars 2023</Cas> : un délai d'exécution de 8 jours seulement après MED est abusif — il faut un délai raisonnable, au minimum un mois. La clause de dispense de MED est qualifiée d'abusive (<Cas>CJUE Banco Primus 2017</Cas>), ce qui aboutit à la gratuité du crédit.</P>
    </>
  ),

  "ci-vii": ({ sectionId }) => (
    <>
      <H level={2}>Chapitre 3 — Le crédit immobilier</H>
      <H level={3}>VII. La prescription</H>

      <Pepites sectionId={sectionId} items={[
        <><Mask>Lien de congruence</Mask> : la prescription doit être adaptée à la durée du crédit. La réforme 2008 a rompu la congruence (5 ans en immobilier vs 30 ans de durée).</>,
        <><Cas>CJUE 8 sept. 2022</Cas> : par <Mask>principe d'effectivité</Mask>, le droit communautaire s'oppose à un délai de 10 ans pour un crédit de 30 ans.</>,
        <><Cas>Cass. 11 février 2016</Cas> (arrêt structurant) : la prescription de 2 ans n'éteint que <Mask>l'échéance impayée</Mask>, pas le capital restant dû — la dette devient en pratique imprescriptible.</>,
        <><Cas>Cass. 20 octobre 2021</Cas> : le décès de l'emprunteur n'a aucune incidence — seul le <Mask>prononcé de la déchéance du terme</Mask> déclenche la prescription.</>,
      ]} />

      <P>Le délai doit être adapté à la durée du crédit (<Em>« lien de congruence »</Em>). Avant 2008, les actes mixtes que sont les prêts bancaires se prescrivaient par 10 ans. La réforme de 2008 a ramené le droit commun à 5 ans, et le code de la consommation à 2 ans pour le crédit à la consommation et à 5 ans pour l'immobilier — la congruence est rompue pour des crédits qui durent 30 ans. <Cas>CJUE 8 sept. 2022</Cas> : par application du principe d'effectivité, le droit communautaire s'oppose à un délai de 10 ans pour un crédit de 30 ans.</P>

      <Callout kind="warn" title="L'arrêt structurant — Cass. 11 février 2016">
        Il maintient le délai de 2 ans à point de départ flottant, <Term>mais ce qui est éteint, c'est uniquement l'échéance impayée, non le capital restant dû</Term>. La dette est devenue, en pratique, <Term>imprescriptible</Term>. La prescription ne court qu'une fois la déchéance du terme prononcée.
      </Callout>

      <P><Cas>Cass. 20 octobre 2021</Cas> : le décès de l'emprunteur n'a aucune incidence et ne provoque pas la déchéance du crédit — l'information de la banque par le notaire ne fait pas courir le délai. Seul le prononcé de la déchéance du terme déclenche la prescription.</P>

      <Callout kind="prof">
        C'est dire la fragilité de la position de l'emprunteur et de ses héritiers face à un mécanisme conçu pour la sécurité juridique du créancier. Sous prétexte d'éviter l'impunité, la jurisprudence a vidé la prescription protectrice de toute substance — un emprunteur peut être poursuivi vingt-cinq ans après son dernier impayé.
      </Callout>
    </>
  ),

  // ============================== CONCLUSION ==============================
  conclusion: ({ sectionId }) => (
    <>
      <H level={1}>Repères pour la dissertation</H>

      <Pepites sectionId={sectionId} items={[
        <>Trois lignes de fracture : <Mask>protection du client vs liberté bancaire</Mask> ; <Mask>droit national vs droit européen</Mask> ; <Mask>sécurité juridique vs rentabilité économique</Mask>.</>,
        <>Le droit européen comme <Mask>second souffle protecteur</Mask> quand le droit national cède (CJUE office du juge, contrôle JEX, décision humaine ; CEDH validation rétroactive).</>,
        <>Méthode : pour toute règle, chercher la <Mask>tension qu'elle cristallise</Mask>, sa <Mask>généalogie</Mask> (crise, lobby), sa <Mask>dialectique</Mask> — chronique des rapports de force traduits en droit.</>,
      ]} />

      <P><Strong>Trois lignes de fracture irriguent la matière.</Strong> Toute question de droit bancaire se laisse lire à travers l'une au moins de ces trois oppositions. Les trier permet souvent d'organiser un plan en deux parties.</P>

      <Callout kind="tension" title="1. Protection du client vs. liberté bancaire">
        Toute l'évolution du droit bancaire peut se lire comme un duel entre le législateur protecteur et le lobby bancaire. Chaque protection (taux d'usure, formalisme du TAEG, sanction automatique, mobilité bancaire) a été obtenue après une crise, puis grignotée à mesure que la pression bancaire s'exerce.
        <br/><br/>
        L'<Term>ordonnance de 2019</Term> supprimant la sanction automatique du TAEG, la <Term>loi PACTE de 2019</Term> supprimant l'encadrement de la domiciliation, la <Term>loi de 2014</Term> validant rétroactivement les prêts Dexia : autant de jalons d'un recul de la protection sous couvert d'efficacité économique.
      </Callout>

      <Callout kind="info" title="2. Droit national vs. droit européen">
        Le droit communautaire fonctionne comme un <Em>second souffle protecteur</Em> quand le droit national cède. La CJUE impose l'office du juge sur les clauses abusives, le contrôle du JEX sur les actes notariés, la décision humaine d'octroi de crédit, la conformité du TAEG. La CEDH a censuré la validation rétroactive du tableau d'amortissement.
        <br/><br/>
        Mais le droit européen joue aussi à rebours : la libre prestation de services autorise les banques étrangères à appliquer leur droit national en France, parfois plus laxiste.
      </Callout>

      <Callout kind="prof" title="3. Sécurité juridique vs. rentabilité économique">
        Le passage de la fixité à la variabilité du taux (1995-1996), la dépénalisation de l'usure (2003), l'admission du sauvetage par bail-in (2014), la tolérance européenne pour les non-indemnisations (BES, banque bulgare, banque italienne) traduisent une même philosophie : faire primer la rentabilité du système sur la sécurité de la partie faible. La crise des subprimes, le scandale Helvet Immo et la bulle immobilière française ont montré le coût de cette inversion.
      </Callout>

      <Callout kind="warn" title="Méthode pour la dissertation">
        Ne jamais traiter une règle comme un dogme. Toujours rechercher la <Term>tension qu'elle cristallise</Term>, sa <Term>généalogie</Term> (quelle crise l'a fait naître, quel lobby l'a infléchie), sa <Term>dialectique</Term> (quel mouvement contraire elle suscite). Le droit bancaire n'est pas un corps de règles, c'est une chronique des rapports de force économiques traduits en droit.
      </Callout>
    </>
  ),
};

// ============================================================
// COMPOSANT PRINCIPAL
// ============================================================
export default function App() {
  const [currentId, setCurrentId] = useState("intro");
  const [progress, setProgress] = useState({}); // {sectionId: { confidence, lastReviewed, nextDue, reviewCount } | null}
  const [bookmarks, setBookmarks] = useState({});
  const [notes, setNotes] = useState({});
  const [search, setSearch] = useState("");
  const [openGroups, setOpenGroups] = useState({});
  const [isMobile, setIsMobile] = useState(() => typeof window !== "undefined" && window.innerWidth < 720);
  const [sidebarOpen, setSidebarOpen] = useState(() => typeof window === "undefined" || window.innerWidth >= 720);
  const [sidebarHover, setSidebarHover] = useState(false);
  const [notesOpen, setNotesOpen] = useState(false);
  const [draftNote, setDraftNote] = useState("");
  const [maskedMode, setMaskedMode] = useState({ pepites: false, cas: false });
  const [reviewMode, setReviewMode] = useState(false);
  const [reviewIndex, setReviewIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const contentRef = useRef(null);

  // === Synchroniser isMobile avec la taille de fenêtre ===
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 720);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // === Charger fonts + keyframes pulse ===
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=EB+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Manrope:wght@400;500;600;700&display=swap";
    document.head.appendChild(link);

    const style = document.createElement("style");
    style.textContent = `
      @keyframes pulse {
        0%, 100% { opacity: 0.6; transform: scale(1); }
        50% { opacity: 0.2; transform: scale(1.4); }
      }
      .toc-nav { scrollbar-width: thin; scrollbar-color: rgba(255,255,255,0.18) transparent; }
      .toc-nav::-webkit-scrollbar { width: 6px; }
      .toc-nav::-webkit-scrollbar-track { background: transparent; }
      .toc-nav::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.15); border-radius: 3px; }
      .toc-nav::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.25); }
      .toc-nav::-webkit-scrollbar-button { display: none; }
    `;
    document.head.appendChild(style);

    return () => {
      try { document.head.removeChild(link); } catch (e) {}
      try { document.head.removeChild(style); } catch (e) {}
    };
  }, []);

  // === Charger état depuis storage ===
  useEffect(() => {
    (async () => {
      try {
        const p = await window.storage.get("progress");
        if (p && p.value) {
          const raw = JSON.parse(p.value);
          const migrated = {};
          for (const [id, val] of Object.entries(raw)) {
            if (typeof val === "boolean") {
              migrated[id] = val
                ? { confidence: "green", lastReviewed: new Date().toISOString(), nextDue: null, reviewCount: 1 }
                : null;
            } else if (val && typeof val === "object" && "confidence" in val) {
              migrated[id] = val;
            } else {
              migrated[id] = null;
            }
          }
          setProgress(migrated);
        }
      } catch (e) {}
      try {
        const b = await window.storage.get("bookmarks");
        if (b && b.value) setBookmarks(JSON.parse(b.value));
      } catch (e) {}
      try {
        const n = await window.storage.get("notes");
        if (n && n.value) setNotes(JSON.parse(n.value));
      } catch (e) {}
      try {
        const c = await window.storage.get("currentId");
        if (c && c.value) setCurrentId(c.value);
      } catch (e) {}
      try {
        const m = await window.storage.get("maskedMode");
        if (m && m.value) {
          const parsed = JSON.parse(m.value);
          if (typeof parsed === "boolean") {
            setMaskedMode({ pepites: parsed, cas: false });
          } else if (parsed && typeof parsed === "object") {
            setMaskedMode({
              pepites: !!parsed.pepites,
              cas: !!parsed.cas,
            });
          }
        }
      } catch (e) {}
      // ouvrir tous les groupes par défaut
      const groups = {};
      TOC.forEach(s => { groups[s.group] = true; });
      setOpenGroups(groups);
      setLoaded(true);
    })();
  }, []);

  // === Sauvegarder dans storage ===
  useEffect(() => {
    if (loaded) {
      window.storage.set("progress", JSON.stringify(progress)).catch(() => {});
    }
  }, [progress, loaded]);
  useEffect(() => {
    if (loaded) window.storage.set("bookmarks", JSON.stringify(bookmarks)).catch(() => {});
  }, [bookmarks, loaded]);
  useEffect(() => {
    if (loaded) window.storage.set("notes", JSON.stringify(notes)).catch(() => {});
  }, [notes, loaded]);
  useEffect(() => {
    if (loaded) window.storage.set("currentId", currentId).catch(() => {});
  }, [currentId, loaded]);
  useEffect(() => {
    if (loaded) window.storage.set("maskedMode", JSON.stringify(maskedMode)).catch(() => {});
  }, [maskedMode, loaded]);

  // === Charger draft note quand on change de section ===
  useEffect(() => {
    setDraftNote(notes[currentId] || "");
  }, [currentId, notes]);

  // Scroll to top on section change
  useEffect(() => {
    if (contentRef.current) contentRef.current.scrollTop = 0;
  }, [currentId]);

  // Auto-déclenchement du test en mode révision
  useEffect(() => {
    if (!reviewMode || !currentId) return;
    const timer = setTimeout(() => {
      window.dispatchEvent(new CustomEvent("pepites:test", { detail: { sectionId: currentId } }));
    }, 400);
    return () => clearTimeout(timer);
  }, [currentId, reviewMode]);

  const setConfidence = (id, level) => {
    setProgress(p => {
      const newReviewCount = (p[id]?.reviewCount ?? 0) + 1;
      return {
        ...p,
        [id]: {
          confidence: level,
          lastReviewed: new Date().toISOString(),
          nextDue: computeNextDue(level, newReviewCount),
          reviewCount: newReviewCount,
        },
      };
    });
  };
  const clearConfidence = (id) => {
    setProgress(p => {
      const next = { ...p };
      delete next[id];
      return next;
    });
  };
  const getConfidence = (id) => progress[id]?.confidence ?? null;
  const isDue = (id) => {
    const p = progress[id];
    if (!p?.nextDue) return false;
    return new Date(p.nextDue) <= new Date();
  };
  const daysUntilDue = (id) => {
    const p = progress[id];
    if (!p?.nextDue) return null;
    const nowMs = Date.now();
    const nextMs = new Date(p.nextDue).getTime();
    return Math.ceil((nextMs - nowMs) / (1000 * 60 * 60 * 24));
  };

  const toggleBookmark = (id) => setBookmarks(b => ({ ...b, [id]: !b[id] }));
  const saveNote = () => setNotes(n => ({ ...n, [currentId]: draftNote }));

  const flatTOC = TOC;
  const currentIdx = flatTOC.findIndex(s => s.id === currentId);

  const dueCount = useMemo(
    () => {
      if (!loaded) return 0;
      return flatTOC.filter(s => {
        const p = progress[s.id];
        if (!p?.nextDue) return false;
        return new Date(p.nextDue) <= new Date();
      }).length;
    },
    [progress, loaded, flatTOC]
  );

  const reviewQueue = useMemo(() => {
    if (!loaded) return [];
    const order = { red: 0, yellow: 1, green: 2 };
    const now = Date.now();
    return flatTOC
      .filter(s => {
        const p = progress[s.id];
        if (!p?.nextDue) return false;
        return new Date(p.nextDue).getTime() <= now;
      })
      .map(s => {
        const nextMs = new Date(progress[s.id].nextDue).getTime();
        const daysOverdue = Math.ceil((now - nextMs) / (1000 * 60 * 60 * 24));
        return {
          id: s.id,
          title: s.title,
          group: s.group,
          confidence: progress[s.id]?.confidence ?? "red",
          daysOverdue,
        };
      })
      .sort((a, b) => {
        const levelDiff = order[a.confidence] - order[b.confidence];
        if (levelDiff !== 0) return levelDiff;
        return b.daysOverdue - a.daysOverdue;
      });
  }, [progress, loaded, flatTOC]);

  const prev = reviewMode
    ? (reviewIndex > 0 ? reviewQueue[reviewIndex - 1] : null)
    : (currentIdx > 0 ? flatTOC[currentIdx - 1] : null);
  const next = reviewMode
    ? (reviewIndex < reviewQueue.length - 1 ? reviewQueue[reviewIndex + 1] : null)
    : (currentIdx < flatTOC.length - 1 ? flatTOC[currentIdx + 1] : null);

  // Group sidebar
  const groups = useMemo(() => {
    const filtered = flatTOC.filter(s => {
      if (!search) return true;
      return s.title.toLowerCase().includes(search.toLowerCase()) ||
             s.group.toLowerCase().includes(search.toLowerCase());
    });
    const out = [];
    const seen = {};
    filtered.forEach(s => {
      if (!seen[s.group]) {
        seen[s.group] = { name: s.group, items: [] };
        out.push(seen[s.group]);
      }
      seen[s.group].items.push(s);
    });
    return out;
  }, [search]);

  const totalGreen = Object.values(progress).filter(s => s?.confidence === "green").length;
  const totalYellow = Object.values(progress).filter(s => s?.confidence === "yellow").length;
  const totalRed = Object.values(progress).filter(s => s?.confidence === "red").length;
  const totalSections = flatTOC.length;
  const percentage = Math.round((totalGreen / totalSections) * 100);

  const Current = SECTIONS[currentId] || (() => <div>Section introuvable</div>);

  return (
    <ProgressContext.Provider value={{ setConfidence, getConfidence }}>
    <MaskedModeContext.Provider value={maskedMode}>
    <div style={{
      backgroundColor: C.bg,
      minHeight: "100vh",
      width: "100%",
      fontFamily: "'Manrope', -apple-system, sans-serif",
      color: C.ink,
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
    }}>
      {/* === Texture de fond === */}
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
        backgroundImage: `radial-gradient(circle at 20% 25%, rgba(157, 135, 224, 0.10) 0%, transparent 55%),
                          radial-gradient(circle at 85% 75%, rgba(244, 216, 140, 0.06) 0%, transparent 50%),
                          radial-gradient(circle at 50% 100%, rgba(215, 114, 149, 0.05) 0%, transparent 60%)`,
      }}/>

      {/* === Filtre SVG Liquid Glass (réfraction non-uniforme) === */}
      <svg
        aria-hidden="true"
        style={{ position: "absolute", width: 0, height: 0, overflow: "hidden", pointerEvents: "none" }}
      >
        <defs>
          <filter id="liquid-glass" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.008" numOctaves="2" seed="92" result="noise"/>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="77"/>
          </filter>
        </defs>
      </svg>

      {/* === HEADER === */}
      <header style={{
        backgroundColor: C.paper,
        borderBottom: `1px solid ${C.rule}`,
        padding: isMobile ? "10px 14px" : "14px 24px",
        display: "flex",
        alignItems: "center",
        gap: isMobile ? 8 : 16,
        flexWrap: "wrap",
        rowGap: 8,
        position: "relative",
        zIndex: 10,
        flexShrink: 0,
      }}>
        {isMobile && (
          <button onClick={() => setSidebarOpen(s => !s)} style={{
            background: "transparent",
            border: `1px solid ${C.rule}`,
            borderRadius: 4,
            padding: 6,
            cursor: "pointer",
            color: C.ink,
            display: "flex",
          }}>
            {sidebarOpen ? <X size={18}/> : <Menu size={18}/>}
          </button>
        )}

        <div style={{ display: "flex", alignItems: "center", gap: 12, flex: 1, minWidth: 0 }}>
          <BookOpen size={22} color={C.burgundy}/>
          <div style={{ minWidth: 0 }}>
            <div style={{
              fontFamily: "'Fraunces', serif",
              fontSize: 20,
              fontWeight: 600,
              color: C.navy,
              lineHeight: 1.1,
              letterSpacing: "-0.01em",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}>Droit bancaire</div>
            <div style={{
              fontSize: 11,
              color: C.inkSoft,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              fontWeight: 500,
              display: isMobile ? "none" : "block",
            }}>Fiche d'apprentissage — mimi hater</div>
          </div>
        </div>

        {/* badges révision */}
        <div style={{ display: "flex", gap: 8, alignItems: "center", marginLeft: "auto" }}>
          {loaded && dueCount > 0 && !reviewMode && (
            <button
              onClick={() => {
                if (reviewQueue.length === 0) return;
                setReviewIndex(0);
                setReviewMode(true);
                setCurrentId(reviewQueue[0].id);
              }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "8px 14px",
                backgroundColor: C.burgundy,
                color: C.paper,
                border: "none",
                borderRadius: 4,
                cursor: "pointer",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                fontFamily: "'Manrope', sans-serif",
                transition: "all 0.15s",
              }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = "#A33F60"}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = C.burgundy}
            >
              <span style={{
                width: 6, height: 6, borderRadius: "50%",
                backgroundColor: C.paper,
                animation: "pulse 1.5s ease-in-out infinite",
              }}/>
              Réviser {dueCount} {dueCount > 1 ? "sections" : "section"}
            </button>
          )}
          {loaded && dueCount === 0 && Object.keys(progress).length > 0 && (
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "8px 14px",
              backgroundColor: "transparent",
              color: C.forest,
              border: `1px solid ${C.forest}`,
              borderRadius: 4,
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              fontFamily: "'Manrope', sans-serif",
            }}>
              <Check size={12}/>
              À jour
            </div>
          )}
        </div>

        {/* toggles mode masqué */}
        <div style={{ display: "flex", gap: 6 }}>
          <button
            onClick={() => setMaskedMode(m => ({ ...m, pepites: !m.pepites }))}
            style={{
              background: maskedMode.pepites ? C.ink : "transparent",
              color: maskedMode.pepites ? C.paper : C.ink,
              border: `1px solid ${maskedMode.pepites ? C.ink : C.rule}`,
              borderRadius: 4,
              padding: "8px 12px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 6,
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              fontFamily: "inherit",
              transition: "all 0.15s",
            }}
            title={maskedMode.pepites ? "Pépites masquées — clic pour révéler" : "Masquer les pépites (rappel actif sur les mots-clés)"}
          >
            {maskedMode.pepites ? <EyeOff size={14}/> : <Target size={14}/>}
            {!isMobile && <span>Pépites</span>}
          </button>

          <button
            onClick={() => setMaskedMode(m => ({ ...m, cas: !m.cas }))}
            style={{
              background: maskedMode.cas ? C.gold : "transparent",
              color: maskedMode.cas ? C.paper : C.gold,
              border: `1px solid ${maskedMode.cas ? C.gold : C.rule}`,
              borderRadius: 4,
              padding: "8px 12px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 6,
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              fontFamily: "inherit",
              transition: "all 0.15s",
            }}
            title={maskedMode.cas ? "Arrêts masqués — clic pour révéler" : "Masquer les arrêts (drill jurisprudentiel)"}
          >
            <Scale size={14}/>
            {!isMobile && <span>Arrêts</span>}
          </button>
        </div>

        {/* progression */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ textAlign: "right", display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
            <div style={{ fontSize: 11, color: C.inkSoft, textTransform: "uppercase", letterSpacing: "0.08em" }}>Progression</div>
            <div style={{ fontFamily: "'Fraunces', serif", fontSize: 18, color: C.navy, fontWeight: 600 }}>{percentage}%</div>
            <div style={{
              display: "flex",
              height: 4,
              width: 80,
              borderRadius: 2,
              overflow: "hidden",
              marginTop: 4,
              backgroundColor: C.ruleSoft,
            }}>
              <div style={{ flex: totalRed,    backgroundColor: CONFIDENCE.red.color }}/>
              <div style={{ flex: totalYellow, backgroundColor: CONFIDENCE.yellow.color }}/>
              <div style={{ flex: totalGreen,  backgroundColor: CONFIDENCE.green.color }}/>
            </div>
          </div>
          <div style={{
            width: 90, height: 6, backgroundColor: C.ruleSoft, borderRadius: 3, overflow: "hidden"
          }}>
            <div style={{
              width: `${percentage}%`, height: "100%",
              backgroundColor: C.burgundy,
              transition: "width 0.4s ease"
            }}/>
          </div>
          {isMobile && (
            <button onClick={() => setNotesOpen(o => !o)} style={{
              background: notesOpen ? C.navy : "transparent",
              color: notesOpen ? C.paper : C.ink,
              border: `1px solid ${C.rule}`,
              borderRadius: 4,
              padding: "6px 10px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 6,
              fontSize: 12,
              fontWeight: 500,
            }}>
              <Edit3 size={14}/>
            </button>
          )}
        </div>
      </header>

      {/* === MAIN === */}
      <div style={{ display: "flex", flex: 1, overflow: "hidden", position: "relative" }}>
        {/* === BACKDROP MOBILE === */}
        {isMobile && (sidebarOpen || notesOpen) && (
          <div
            onClick={() => { setSidebarOpen(false); setNotesOpen(false); }}
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(8, 12, 28, 0.45)",
              backdropFilter: "blur(2px)",
              WebkitBackdropFilter: "blur(2px)",
              zIndex: 15,
              cursor: "pointer",
            }}
          />
        )}

        {/* === SIDEBAR (Liquid Glass + auto-hide rail) === */}
        {(!isMobile || sidebarOpen) && (
          <aside
            onMouseEnter={() => { if (!isMobile) setSidebarHover(true); }}
            onMouseLeave={() => { if (!isMobile) setSidebarHover(false); }}
            style={{
            position: "absolute",
            left: isMobile ? 0 : 8,
            width: isMobile ? "min(85vw, 320px)" : (sidebarHover ? 304 : 22),
            top: isMobile ? 0 : 8,
            bottom: isMobile ? 0 : 8,
            zIndex: isMobile ? 20 : 10,
            backgroundColor: "rgba(255, 255, 255, 0.08)",
            backdropFilter: "url(#liquid-glass) blur(10px) saturate(160%)",
            WebkitBackdropFilter: "blur(10px) saturate(160%)",
            borderRadius: isMobile ? "0 20px 20px 0" : 28,
            border: "1px solid rgba(255, 255, 255, 0.16)",
            display: "flex",
            flexDirection: "column",
            flexShrink: 0,
            overflow: "hidden",
            transition: isMobile
              ? "none"
              : "width 0.55s cubic-bezier(0.32, 0.72, 0, 1)",
            cursor: !isMobile && !sidebarHover ? "pointer" : "default",
            boxShadow: isMobile
              ? "2px 0 32px rgba(0, 0, 0, 0.45), inset 0 0 20px -5px rgba(255, 255, 255, 0.7)"
              : "inset 0 0 20px -5px rgba(255, 255, 255, 0.7), 0 8px 32px rgba(0, 0, 0, 0.25)",
          }}>
            <div style={{
              width: isMobile ? "100%" : 304,
              height: "100%",
              display: "flex",
              flexDirection: "column",
              opacity: isMobile || sidebarHover ? 1 : 0,
              pointerEvents: isMobile || sidebarHover ? "auto" : "none",
              transition: isMobile || sidebarHover
                ? "opacity 0.3s ease 0.25s"
                : "opacity 0.18s ease",
              flexShrink: 0,
            }}>
            {/* search */}
            <div style={{ padding: "14px 16px", borderBottom: "1px solid rgba(232, 221, 201, 0.06)" }}>
              <div style={{
                position: "relative", display: "flex", alignItems: "center"
              }}>
                <Search size={14} style={{ position: "absolute", left: 10, color: C.inkSoft }}/>
                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Rechercher dans la fiche..."
                  style={{
                    width: "100%", padding: "8px 10px 8px 32px",
                    border: "1px solid rgba(232, 221, 201, 0.1)",
                    borderRadius: 8,
                    fontSize: 13,
                    fontFamily: "inherit",
                    backgroundColor: "rgba(14, 23, 48, 0.5)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    color: C.ink,
                    outline: "none",
                  }}
                />
              </div>
            </div>

            {/* TOC */}
            <nav className="toc-nav" style={{ overflowY: "auto", flex: 1, padding: "8px 0" }}>
              {groups.map(group => (
                <div key={group.name}>
                  <div
                    onClick={() => setOpenGroups(o => ({ ...o, [group.name]: !o[group.name] }))}
                    style={{
                      padding: "10px 16px 6px",
                      fontSize: 11,
                      fontWeight: 700,
                      color: C.navy,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      userSelect: "none",
                    }}
                  >
                    {openGroups[group.name] ? <ChevronDown size={12}/> : <ChevronRight size={12}/>}
                    <span style={{ flex: 1 }}>{group.name}</span>
                    <span style={{ fontSize: 10, color: C.inkSoft, fontWeight: 500 }}>
                      {group.items.filter(i => progress[i.id]?.confidence === "green").length}/{group.items.length}
                    </span>
                  </div>
                  {openGroups[group.name] && group.items.map(item => {
                    const isActive = item.id === currentId;
                    const itemConfidence = progress[item.id]?.confidence ?? null;
                    const isBookmark = bookmarks[item.id];
                    return (
                      <div
                        key={item.id}
                        onClick={() => {
                          setCurrentId(item.id);
                          if (isMobile) setSidebarOpen(false);
                        }}
                        style={{
                          padding: "7px 16px 7px 32px",
                          fontSize: 13.5,
                          fontFamily: "'EB Garamond', serif",
                          fontWeight: isActive ? 600 : 400,
                          color: isActive ? C.burgundy : C.ink,
                          backgroundColor: isActive ? "rgba(232, 221, 201, 0.08)" : "transparent",
                          cursor: "pointer",
                          borderLeft: isActive ? `3px solid ${C.burgundy}` : `3px solid transparent`,
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                          lineHeight: 1.3,
                          transition: "background 0.15s",
                        }}
                        onMouseEnter={e => { if (!isActive) e.currentTarget.style.backgroundColor = "rgba(232, 221, 201, 0.05)"; }}
                        onMouseLeave={e => { if (!isActive) e.currentTarget.style.backgroundColor = "transparent"; }}
                      >
                        <div style={{ position: "relative", flexShrink: 0, width: 10, height: 10 }}>
                          <div style={{
                            width: 10,
                            height: 10,
                            borderRadius: "50%",
                            backgroundColor: itemConfidence ? CONFIDENCE[itemConfidence].color : "transparent",
                            border: itemConfidence ? "none" : `1.5px solid ${C.rule}`,
                          }}/>
                          {isDue(item.id) && (
                            <div style={{
                              position: "absolute",
                              inset: -3,
                              borderRadius: "50%",
                              border: `2px solid ${itemConfidence ? CONFIDENCE[itemConfidence].color : C.burgundy}`,
                              animation: "pulse 1.5s ease-in-out infinite",
                              pointerEvents: "none",
                            }}/>
                          )}
                        </div>
                        <span style={{ flex: 1 }}>{item.title}</span>
                        {isBookmark && <BookmarkCheck size={13} color={C.gold}/>}
                      </div>
                    );
                  })}
                </div>
              ))}
            </nav>

            {/* footer sidebar */}
            <div style={{
              padding: "10px 16px",
              borderTop: "1px solid rgba(232, 221, 201, 0.06)",
              fontSize: 11,
              color: C.inkSoft,
              fontStyle: "italic",
              fontFamily: "'EB Garamond', serif",
            }}>
              Fiche personnelle pour partiel de dissertation. Vos progrès, marque-pages et notes sont sauvegardés.
            </div>
            </div>
          </aside>
        )}

        {/* === CONTENT === */}
        <main ref={contentRef} style={{
          flex: 1,
          overflowY: "auto",
          backgroundColor: C.bg,
          position: "relative",
          zIndex: 1,
        }}>
          <div style={{
            maxWidth: 760,
            margin: "0 auto",
            padding: isMobile ? "20px 16px 80px" : "48px 40px 100px",
          }}>
            {(maskedMode.pepites || maskedMode.cas) && (
              <div style={{
                backgroundColor: C.ink,
                color: C.paper,
                padding: "8px 16px",
                fontSize: 11,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                fontWeight: 600,
                fontFamily: "'Manrope', sans-serif",
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: 16,
                borderRadius: 2,
              }}>
                <EyeOff size={12}/>
                <span>Mode masqué actif :</span>
                {maskedMode.pepites && (
                  <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <Target size={11}/> Pépites
                  </span>
                )}
                {maskedMode.pepites && maskedMode.cas && <span style={{ opacity: 0.5 }}>+</span>}
                {maskedMode.cas && (
                  <span style={{ display: "flex", alignItems: "center", gap: 4, color: C.gold }}>
                    <Scale size={11}/> Arrêts
                  </span>
                )}
                <span style={{ marginLeft: "auto", opacity: 0.7, fontSize: 10 }}>
                  Cliquer sur les zones pour révéler
                </span>
              </div>
            )}
            {reviewMode && (
              <div style={{
                backgroundColor: C.burgundy,
                color: C.paper,
                padding: "12px 18px",
                fontSize: 12,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                fontWeight: 600,
                fontFamily: "'Manrope', sans-serif",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 16,
                borderRadius: 2,
                gap: 12,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                  <Target size={14}/>
                  <span>Révision en cours</span>
                  <span style={{ opacity: 0.7 }}>•</span>
                  <span>{reviewIndex + 1} / {reviewQueue.length}</span>
                  {reviewQueue[reviewIndex] && (
                    <>
                      <span style={{ opacity: 0.7 }}>•</span>
                      <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <span style={{
                          width: 8, height: 8, borderRadius: "50%",
                          backgroundColor: CONFIDENCE[reviewQueue[reviewIndex].confidence].color,
                        }}/>
                        {CONFIDENCE[reviewQueue[reviewIndex].confidence].short}
                      </span>
                    </>
                  )}
                </div>
                <button
                  onClick={() => {
                    setReviewMode(false);
                    setReviewIndex(0);
                  }}
                  style={{
                    background: "transparent",
                    border: `1px solid ${C.paper}`,
                    color: C.paper,
                    padding: "5px 12px",
                    borderRadius: 3,
                    cursor: "pointer",
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                    fontFamily: "inherit",
                  }}
                >
                  Quitter
                </button>
              </div>
            )}
            {/* breadcrumb */}
            <div style={{
              fontSize: 11,
              color: C.inkSoft,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: 24,
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: 10,
              fontFamily: "'Manrope', sans-serif",
            }}>
              <span>{flatTOC[currentIdx]?.group}</span>
              <span style={{ color: C.rule }}>•</span>
              <span>Section {currentIdx + 1} / {totalSections}</span>
              <button onClick={() => toggleBookmark(currentId)} style={{
                marginLeft: "auto",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                color: bookmarks[currentId] ? C.gold : C.inkSoft,
                display: "flex",
                alignItems: "center",
                gap: 4,
                fontSize: 11,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                fontWeight: 600,
                fontFamily: "inherit",
              }}>
                {bookmarks[currentId]
                  ? <><BookmarkCheck size={14}/> Marqué</>
                  : <><Bookmark size={14}/> Marquer</>}
              </button>
            </div>

            {/* main content */}
            <article style={{ lineHeight: 1.6 }}>
              <Current sectionId={currentId}/>
            </article>

            {/* nav footer */}
            <div style={{
              marginTop: 60,
              paddingTop: 24,
              borderTop: `1px solid ${C.rule}`,
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}>
              <button
                onClick={() => {
                  if (contentRef.current) contentRef.current.scrollTop = 0;
                  window.dispatchEvent(new CustomEvent("pepites:test", { detail: { sectionId: currentId } }));
                }}
                style={{
                  alignSelf: "flex-start",
                  padding: "10px 16px",
                  background: "transparent",
                  color: C.burgundy,
                  border: `1px dashed ${C.burgundy}`,
                  borderRadius: 4,
                  cursor: "pointer",
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  fontFamily: "inherit",
                }}
              >
                📝 Me tester sur cette section
              </button>
              <div>
                <div style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: 11,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: C.inkSoft,
                  fontWeight: 600,
                  marginBottom: 8,
                }}>
                  Où en es-tu sur cette section&nbsp;?
                </div>
                <div style={{ display: "flex", gap: 8, marginBottom: 0 }}>
                  {["red", "yellow", "green"].map(level => {
                    const conf = CONFIDENCE[level];
                    const active = getConfidence(currentId) === level;
                    return (
                      <button
                        key={level}
                        onClick={() => active ? clearConfidence(currentId) : setConfidence(currentId, level)}
                        onMouseEnter={e => { if (!active) e.currentTarget.style.borderColor = conf.color; }}
                        onMouseLeave={e => { if (!active) e.currentTarget.style.borderColor = C.rule; }}
                        style={{
                          flex: 1,
                          padding: "12px 16px",
                          borderRadius: 4,
                          fontFamily: "inherit",
                          fontSize: 13,
                          fontWeight: 600,
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: 6,
                          cursor: "pointer",
                          transition: "all 0.15s",
                          background: active ? conf.bg : C.paper,
                          border: active ? `2px solid ${conf.color}` : `1px solid ${C.rule}`,
                          color: active ? conf.color : C.inkSoft,
                        }}
                      >
                        <span style={{
                          width: 16,
                          height: 16,
                          borderRadius: "50%",
                          backgroundColor: conf.color,
                          display: "block",
                        }}/>
                        <span style={{
                          fontSize: 11,
                          letterSpacing: "0.05em",
                          textTransform: "uppercase",
                        }}>{conf.short}</span>
                      </button>
                    );
                  })}
                </div>
                <div style={{
                  fontFamily: "'EB Garamond', serif",
                  fontStyle: "italic",
                  fontSize: 14,
                  color: C.inkSoft,
                  marginTop: 10,
                  textAlign: "center",
                  minHeight: 20,
                }}>
                  {getConfidence(currentId)
                    ? CONFIDENCE[getConfidence(currentId)].description
                    : "Évalue honnêtement ta maîtrise — c'est ce qui pilotera ta révision."}
                </div>
                {progress[currentId]?.nextDue && (() => {
                  const days = daysUntilDue(currentId);
                  let label, color;
                  if (days < 0) {
                    label = `À revoir (en retard de ${Math.abs(days)} jour${Math.abs(days) > 1 ? "s" : ""})`;
                    color = C.burgundy;
                  } else if (days === 0) {
                    label = "À revoir aujourd'hui";
                    color = C.gold;
                  } else if (days === 1) {
                    label = "Prochaine révision : demain";
                    color = C.inkSoft;
                  } else {
                    label = `Prochaine révision : dans ${days} jours`;
                    color = C.inkSoft;
                  }
                  return (
                    <div style={{
                      marginTop: 12,
                      paddingTop: 10,
                      borderTop: `1px solid ${C.ruleSoft}`,
                      fontFamily: "'Manrope', sans-serif",
                      fontSize: 11,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      fontWeight: 600,
                      color,
                      textAlign: "center",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 6,
                    }}>
                      📅 {label}
                    </div>
                  );
                })()}
              </div>

              <div style={{ display: "flex", gap: 12 }}>
                <button
                  onClick={() => {
                    if (!prev) return;
                    if (reviewMode) setReviewIndex(i => i - 1);
                    setCurrentId(prev.id);
                  }}
                  disabled={!prev}
                  style={{
                    flex: 1, padding: "12px 16px",
                    background: C.paper,
                    color: prev ? C.ink : C.rule,
                    border: `1px solid ${prev ? C.rule : C.ruleSoft}`,
                    borderRadius: 4,
                    cursor: prev ? "pointer" : "default",
                    fontSize: 12,
                    fontWeight: 500,
                    textAlign: "left",
                    display: "flex",
                    flexDirection: "column",
                    gap: 4,
                    fontFamily: "inherit",
                  }}
                >
                  <span style={{ display: "flex", alignItems: "center", gap: 6, color: C.inkSoft, fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                    <ArrowLeft size={12}/> Précédent
                  </span>
                  <span style={{ fontFamily: "'Fraunces', serif", fontSize: 14, fontWeight: 600 }}>
                    {prev ? prev.title : "Début"}
                  </span>
                </button>

                {reviewMode && reviewIndex === reviewQueue.length - 1 ? (
                  <button
                    onClick={() => {
                      setReviewMode(false);
                      setReviewIndex(0);
                    }}
                    style={{
                      flex: 1,
                      padding: "12px 16px",
                      background: C.forest,
                      color: C.paper,
                      border: `1px solid ${C.forest}`,
                      borderRadius: 4,
                      cursor: "pointer",
                      fontSize: 13,
                      fontWeight: 600,
                      letterSpacing: "0.05em",
                      textTransform: "uppercase",
                      fontFamily: "inherit",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 8,
                    }}
                  >
                    <Check size={14}/> Terminer la révision
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      if (!next) return;
                      if (reviewMode) setReviewIndex(i => i + 1);
                      setCurrentId(next.id);
                    }}
                    disabled={!next}
                    style={{
                      flex: 1, padding: "12px 16px",
                      background: next ? C.burgundy : C.paper,
                      color: next ? C.paper : C.rule,
                      border: `1px solid ${next ? C.burgundy : C.ruleSoft}`,
                      borderRadius: 4,
                      cursor: next ? "pointer" : "default",
                      fontSize: 12,
                      fontWeight: 500,
                      textAlign: "right",
                      display: "flex",
                      flexDirection: "column",
                      gap: 4,
                      alignItems: "flex-end",
                      fontFamily: "inherit",
                    }}
                  >
                    <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", opacity: 0.85 }}>
                      Suivant <ArrowRight size={12}/>
                    </span>
                    <span style={{ fontFamily: "'Fraunces', serif", fontSize: 14, fontWeight: 600 }}>
                      {next ? next.title : "Fin"}
                    </span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </main>

        {/* === NOTES PANEL (Liquid Glass + ball -> panel) === */}
        {(!isMobile || notesOpen) && (() => {
          const expanded = notesOpen;
          return (
          <aside
            onClick={() => { if (!isMobile && !expanded) setNotesOpen(true); }}
            style={{
              position: "fixed",
              right: isMobile ? 0 : 12,
              width: isMobile ? "min(90vw, 360px)" : (expanded ? 320 : 56),
              top: isMobile ? 0 : (expanded ? 74 : "calc(50vh - 28px)"),
              bottom: isMobile ? 0 : (expanded ? 8 : "calc(50vh - 28px)"),
              zIndex: isMobile ? 20 : 30,
              backgroundColor: "rgba(255, 255, 255, 0.08)",
              backdropFilter: "url(#liquid-glass) blur(10px) saturate(160%)",
              WebkitBackdropFilter: "blur(10px) saturate(160%)",
              borderRadius: isMobile ? "20px 0 0 20px" : 28,
              border: "1px solid rgba(255, 255, 255, 0.16)",
              display: "flex",
              flexDirection: "column",
              flexShrink: 0,
              overflow: "hidden",
              transition: isMobile
                ? "none"
                : "width 0.55s cubic-bezier(0.32, 0.72, 0, 1), top 0.55s cubic-bezier(0.32, 0.72, 0, 1), bottom 0.55s cubic-bezier(0.32, 0.72, 0, 1)",
              cursor: !isMobile && !expanded ? "pointer" : "default",
              boxShadow: isMobile
                ? "-2px 0 32px rgba(0, 0, 0, 0.45), inset 0 0 20px -5px rgba(255, 255, 255, 0.7)"
                : "inset 0 0 20px -5px rgba(255, 255, 255, 0.7), 0 8px 32px rgba(0, 0, 0, 0.25)",
            }}
          >
            {/* Icône repos (desktop seulement) */}
            {!isMobile && (
              <div style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: C.ink,
                opacity: expanded ? 0 : 0.9,
                pointerEvents: "none",
                transition: "opacity 0.18s ease",
              }}>
                <Edit3 size={22}/>
              </div>
            )}

            {/* Contenu complet */}
            <div style={{
              width: isMobile ? "100%" : 320,
              height: "100%",
              display: "flex",
              flexDirection: "column",
              opacity: expanded ? 1 : 0,
              pointerEvents: expanded ? "auto" : "none",
              transition: expanded
                ? "opacity 0.3s ease 0.25s"
                : "opacity 0.18s ease",
              flexShrink: 0,
            }}>
              <div style={{ padding: "14px 16px", borderBottom: "1px solid rgba(232, 221, 201, 0.06)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <div style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: C.inkSoft, fontWeight: 600 }}>Mes notes</div>
                  <div style={{ fontFamily: "'Fraunces', serif", fontSize: 16, color: C.navy, fontWeight: 600, marginTop: 2 }}>
                    {flatTOC[currentIdx]?.title}
                  </div>
                </div>
                <button onClick={(e) => { e.stopPropagation(); setNotesOpen(false); }} style={{
                  background: "transparent", border: "none", cursor: "pointer", color: C.inkSoft,
                }}>
                  <X size={16}/>
                </button>
              </div>

              <textarea
                value={draftNote}
                onChange={e => setDraftNote(e.target.value)}
                placeholder="Vos remarques personnelles, mnémotechniques, références à approfondir..."
                style={{
                  flex: 1,
                  padding: 16,
                  border: "none",
                  outline: "none",
                  resize: "none",
                  fontFamily: "'EB Garamond', Georgia, serif",
                  fontSize: 16,
                  lineHeight: 1.6,
                  color: C.ink,
                  backgroundColor: "transparent",
                }}
              />

              <div style={{ padding: 12, borderTop: "1px solid rgba(232, 221, 201, 0.06)", display: "flex", gap: 8 }}>
                <button onClick={saveNote} style={{
                  flex: 1,
                  padding: "10px",
                  background: C.navy,
                  color: C.paper,
                  border: "none",
                  borderRadius: 999,
                  cursor: "pointer",
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 6,
                  fontFamily: "inherit",
                }}>
                  <Save size={14}/> Sauvegarder
                </button>
                {notes[currentId] && (
                  <span style={{
                    padding: "10px 12px",
                    fontSize: 11,
                    color: C.forest,
                    fontStyle: "italic",
                    fontFamily: "'EB Garamond', serif",
                  }}>
                    ✓ enregistrée
                  </span>
                )}
              </div>
            </div>
          </aside>
          );
        })()}
      </div>
    </div>
    </MaskedModeContext.Provider>
    </ProgressContext.Provider>
  );
}
