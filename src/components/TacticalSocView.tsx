import React from 'react';
import { Question, Badge, getRankByScore } from '../data/questions';

interface TacticalSocViewProps {
  currentQuestion: Question;
  questionNumber: number;
  totalQuestions: number;
  selectedTopic: string;
  onTopicChange: (topic: string) => void;
  lives: number;
  infiniteLives: boolean;
  score: number;
  streak: number;
  badges: Badge[];
  selectedOption: number | null;
  answered: boolean;
  onSelectOption: (index: number) => void;
  onNextQuestion: () => void;
  onShowHint: () => void;
  showHint: boolean;
  isShaking: boolean;
}

export const TacticalSocView: React.FC<TacticalSocViewProps> = ({
  currentQuestion,
  questionNumber,
  totalQuestions,
  selectedTopic,
  onTopicChange,
  lives,
  infiniteLives,
  score,
  streak,
  badges,
  selectedOption,
  answered,
  onSelectOption,
  onNextQuestion,
  onShowHint,
  showHint,
  isShaking,
}) => {
  const rankInfo = getRankByScore(score);
  const progressPercent = totalQuestions > 0 ? (questionNumber / totalQuestions) * 100 : 0;
  const unlockedBadgesCount = badges.filter((b) => b.unlocked).length;

  return (
    <div className="space-y-6">
      {/* BEGIN: TopBar Header (Matches Image 4) */}
      <header className="bg-slate-900/90 backdrop-blur-md border border-slate-800/80 rounded-2xl p-4 sm:p-5 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Logo e Identidad */}
          <div className="flex items-center gap-3.5">
            <div className="relative p-2.5 bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 rounded-xl border border-emerald-500/40 text-emerald-400">
              <svg className="w-7 h-7 filter drop-shadow-[0_0_8px_rgba(16,185,129,0.7)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                  CyberGuard
                </h1>
                <span className="px-2 py-0.5 text-[10px] font-mono font-semibold uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-md">
                  V2.5 PRO
                </span>
              </div>
              <p className="text-xs text-slate-400 flex items-center gap-1.5 font-mono">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Simulador de Amenazas & Ciberdefensa
              </p>
            </div>
          </div>

          {/* Filtro Selector de Módulo */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <label htmlFor="soc-topic-select" className="text-xs font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              MÓDULO:
            </label>
            <div className="relative min-w-[260px]">
              <select
                id="soc-topic-select"
                value={selectedTopic}
                onChange={(e) => onTopicChange(e.target.value)}
                className="w-full bg-[#080d1a] text-sm text-slate-200 border border-slate-700/80 rounded-xl px-3.5 py-2.5 pr-8 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all cursor-pointer font-medium hover:border-slate-600 appearance-none"
              >
                <option value="all">⚡ Todos los temas</option>
                <option value="ataques">🌐 Ataques Web & Phishing</option>
                <option value="passwords">🔑 Contraseñas & MFA</option>
                <option value="malware">🛡️ Malware & Ransomware</option>
                <option value="redes">📡 Seguridad en Redes & Wi-Fi</option>
                <option value="social">🕵️ Ingeniería Social & Privacidad</option>
              </select>
              <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* BEGIN: HUD Status Bar (Matches Image 4) */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-lg backdrop-blur-md">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 items-center font-mono">
          {/* Escudos HUD */}
          <div className="bg-[#080d1a]/80 border border-slate-800/80 rounded-xl p-3 flex items-center justify-between">
            <div className="text-xs text-slate-400 flex items-center gap-1.5">
              <svg className="w-4 h-4 text-rose-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
              <span>ESCUDOS:</span>
            </div>
            <div className="flex gap-1 text-base">
              {infiniteLives ? (
                <span className="text-emerald-400 text-xs px-2 py-0.5 bg-emerald-500/10 rounded border border-emerald-500/30">
                  ∞ INF
                </span>
              ) : (
                [0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className={`transition-transform duration-300 ${
                      i < lives
                        ? 'text-rose-500 filter drop-shadow-[0_0_6px_rgba(244,63,94,0.7)] scale-100'
                        : 'text-slate-600 grayscale opacity-40 scale-90'
                    }`}
                  >
                    {i < lives ? '❤️' : '🖤'}
                  </span>
                ))
              )}
            </div>
          </div>

          {/* Puntuación SCORE HUD */}
          <div className="bg-[#080d1a]/80 border border-slate-800/80 rounded-xl p-3 flex items-center justify-between">
            <div className="text-xs text-slate-400 flex items-center gap-1.5">
              <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              <span>SCORE:</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-emerald-400 glow-text-neon">{score}</span>
              {streak > 1 && (
                <span className="px-1.5 py-0.5 text-[10px] bg-emerald-500/20 text-emerald-300 rounded border border-emerald-500/40 animate-combo">
                  x{streak}
                </span>
              )}
            </div>
          </div>

          {/* RANGO HUD */}
          <div className="bg-[#080d1a]/80 border border-slate-800/80 rounded-xl p-3 flex items-center justify-between">
            <div className="text-xs text-slate-400 flex items-center gap-1.5">
              <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
              <span>RANGO:</span>
            </div>
            <span className={`text-xs font-semibold truncate ${rankInfo.color}`}>
              {rankInfo.title}
            </span>
          </div>

          {/* Progreso FASE HUD */}
          <div className="bg-[#080d1a]/80 border border-slate-800/80 rounded-xl p-3 flex flex-col justify-center gap-1.5">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400">FASE:</span>
              <span className="text-emerald-400 font-bold">
                {questionNumber} / {totalQuestions}
              </span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-gradient-to-r from-emerald-500 to-cyan-400 h-1.5 transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* BEGIN: Main Content Layout Grid */}
      <main className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Columna Principal: Área Interactiva del Quiz (8 Cols) */}
        <section className="lg:col-span-8 space-y-4">
          <div
            className={`bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl relative transition-all duration-300 ${
              isShaking ? 'animate-shake' : ''
            }`}
          >
            {/* Metadatos de la Pregunta: Categoría y Dificultad */}
            <div className="flex flex-wrap items-center justify-between gap-2.5 pb-4 border-b border-slate-800/80">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-lg text-xs font-semibold uppercase tracking-wider bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                  {currentQuestion.topicLabel}
                </span>
                <span className="px-2.5 py-1 rounded-lg text-xs font-mono font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  🟢 Dificultad: {currentQuestion.difficulty}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400">
                <span className="inline-block w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
                <span>Análisis de Amenaza</span>
              </div>
            </div>

            {/* Pregunta Principal */}
            <div className="my-6">
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug">
                {questionNumber}. {currentQuestion.question.replace(/^\d+\.\s*/, '')}
              </h2>
            </div>

            {/* Opciones de Respuesta con letras A, B, C, D */}
            <div className="grid grid-cols-1 gap-3.5 my-6">
              {currentQuestion.options.map((option, idx) => {
                const letters = ['A', 'B', 'C', 'D'];
                const isSelected = selectedOption === idx;
                const isCorrect = idx === currentQuestion.correct;

                let stateClasses =
                  'border-slate-800 bg-[#0b101e]/80 hover:bg-slate-800/90 hover:border-slate-700 text-slate-200';

                if (answered) {
                  if (isCorrect) {
                    stateClasses = 'bg-emerald-950/40 border-emerald-500 glow-border-green text-emerald-200';
                  } else if (isSelected) {
                    stateClasses = 'bg-rose-950/50 border-rose-500 glow-border-rose text-rose-200';
                  } else {
                    stateClasses = 'border-slate-800/60 bg-[#090d18]/40 text-slate-400 opacity-60';
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={answered}
                    onClick={() => onSelectOption(idx)}
                    className={`group relative w-full text-left p-4 rounded-xl border transition-all duration-200 flex items-center justify-between shadow-sm cursor-pointer disabled:cursor-default ${stateClasses}`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-8 h-8 rounded-lg border flex items-center justify-center text-xs font-mono font-bold transition-colors ${
                          answered && isCorrect
                            ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300'
                            : answered && isSelected
                            ? 'bg-rose-500/20 border-rose-400 text-rose-300'
                            : 'bg-slate-800/90 border-slate-700 text-slate-300 group-hover:text-emerald-400 group-hover:border-emerald-500/50'
                        }`}
                      >
                        {letters[idx]}
                      </span>
                      <span className="text-sm font-medium leading-relaxed">{option}</span>
                    </div>

                    {answered && (
                      <span className="text-base font-bold ml-2">
                        {isCorrect ? '✅' : isSelected ? '❌' : ''}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Cuadro de Explicación y Feedback */}
            {answered && (
              <div
                className={`p-4 rounded-xl border mb-4 transition-all ${
                  selectedOption === currentQuestion.correct
                    ? 'border-emerald-500/40 bg-emerald-950/30 text-emerald-200'
                    : 'border-rose-500/40 bg-rose-950/30 text-rose-200'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="text-2xl mt-0.5">
                    {selectedOption === currentQuestion.correct ? '🛡️' : '⚠️'}
                  </div>
                  <div>
                    <p className="font-bold text-sm">
                      {selectedOption === currentQuestion.correct
                        ? `¡Defensa Exitosa! (+${streak > 1 ? 100 * streak : 100} pts)`
                        : 'Brecha de Seguridad Detectada (-1 Escudo)'}
                    </p>
                    <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                      {currentQuestion.explanation}
                    </p>
                    <div className="mt-2.5 flex items-center gap-2 text-xs font-mono">
                      <span className="px-2 py-0.5 rounded bg-slate-800/80 text-cyan-300 border border-slate-700">
                        {currentQuestion.protocol}
                      </span>
                      <span className="text-slate-400">Verificado</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Banner de Pista Oculta/Visible */}
            {showHint && (
              <div className="mb-4 p-3.5 text-xs font-mono bg-cyan-950/40 border border-cyan-800/60 rounded-xl text-cyan-200 flex items-center gap-2">
                <span>💡</span>
                <span>
                  <strong>Pista Táctica:</strong> {currentQuestion.hint}
                </span>
              </div>
            )}

            {/* Botones de Acción Inferiores */}
            <div className="flex flex-wrap items-center justify-between pt-4 border-t border-slate-800/80 gap-3">
              <button
                onClick={onShowHint}
                className="px-3.5 py-2 text-xs font-mono rounded-lg border border-slate-700 bg-slate-800/40 text-slate-300 hover:text-cyan-300 hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{showHint ? 'Ocultar Pista' : 'Ver Pista Táctica'}</span>
              </button>

              {answered && (
                <button
                  onClick={onNextQuestion}
                  className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-sm rounded-xl shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all transform active:scale-95 flex items-center gap-2 cursor-pointer"
                >
                  <span>Siguiente Desafío</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </section>

        {/* BEGIN: Sidebar (4 Cols) */}
        <aside className="lg:col-span-4 space-y-5">
          {/* Widget: Insignias de Misión */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-lg backdrop-blur-md">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 mb-4">
              <h3 className="text-sm font-bold font-mono text-slate-200 uppercase tracking-wider flex items-center gap-2">
                <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138z" />
                </svg>
                Insignias de Misión
              </h3>
              <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                {unlockedBadgesCount}/{badges.length}
              </span>
            </div>

            <div className="space-y-3 font-mono">
              {badges.map((badge) => (
                <div
                  key={badge.id}
                  className={`p-3 rounded-xl border flex items-center gap-3 transition-all duration-300 ${
                    badge.unlocked
                      ? 'bg-emerald-950/30 border-emerald-500/50 text-emerald-200 glow-border-green'
                      : 'bg-[#080d1a]/60 border-slate-800/80 text-slate-400'
                  }`}
                >
                  <div className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center text-lg shadow-inner">
                    {badge.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-xs font-semibold truncate ${badge.unlocked ? 'text-emerald-300' : 'text-slate-300'}`}>
                      {badge.title}
                    </p>
                    <p className="text-[10px] text-slate-500 truncate">{badge.description}</p>
                  </div>
                  <span className="text-xs">{badge.unlocked ? '✅' : '🔒'}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Widget: Píldora SOC en Vivo */}
          <div className="bg-gradient-to-br from-[#0e162a] to-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
            <div className="flex items-center gap-2 mb-3 text-cyan-400">
              <svg className="w-5 h-5 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <h4 className="text-xs font-bold uppercase tracking-wider font-mono">Píldora SOC en Vivo</h4>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              "{currentQuestion.tip}"
            </p>
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-500">
              <span>{currentQuestion.protocol}</span>
              <span className="text-emerald-400 font-semibold">ACTIVO</span>
            </div>
          </div>

          {/* Widget: Mini Guía Defensiva */}
          <div className="bg-[#090e1c] border border-slate-800/80 rounded-2xl p-4 text-xs font-mono text-slate-400 space-y-2">
            <div className="text-slate-300 font-bold flex items-center gap-1.5">
              <span>🛡️</span>
              <span>Reglas de Ciberhigiene</span>
            </div>
            <ul className="space-y-1.5 list-disc list-inside text-[11px] text-slate-400">
              <li>MFA obligatorio en cuentas de correo y financieras</li>
              <li>Actualizaciones de seguridad continuas (parches)</li>
              <li>Desconfianza activa ante remitentes imprevistos</li>
            </ul>
          </div>
        </aside>
      </main>
    </div>
  );
};
