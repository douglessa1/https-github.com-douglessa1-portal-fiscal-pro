import { ToolLayout, FeatureLock, UpgradePrompt } from '../ToolShared';
import { useState, useEffect } from 'react';
import { Building2, Calculator, Copy, Download, History, Lock } from 'lucide-react';
import { ANEXOS, calculateSimplesWithMemory } from '../../lib/simplesHash'; // We'll mock this lib in the component for now

// Mocking the logic directly here to ensure it works without external lib file
const MOCKED_ANEXOS = {
    I: { nome: 'Anexo I - Comércio' },
    II: { nome: 'Anexo II - Indústria' },
    III: { nome: 'Anexo III - Serviços' },
    IV: { nome: 'Anexo IV - Serviços' },
    V: { nome: 'Anexo V - Serviços' }
};

const calculateSimplesMock = (data: any) => {
    const rbt12 = parseFloat(data.rbt12);
    const receita = parseFloat(data.receita);
    // Simplified logic for demo
    let aliqNominal = 0;
    let deducao = 0;
    
    if (data.anexo === 'I') {
        if (rbt12 <= 180000) { aliqNominal = 4; deducao = 0; }
        else if (rbt12 <= 360000) { aliqNominal = 7.3; deducao = 5940; }
        else { aliqNominal = 9.5; deducao = 13860; }
    } else {
        if (rbt12 <= 180000) { aliqNominal = 6; deducao = 0; }
        else { aliqNominal = 11.2; deducao = 9360; }
    }

    const aliqEfetiva = (((rbt12 * aliqNominal / 100) - deducao) / rbt12) * 100;
    const finalAliq = Math.max(aliqEfetiva, 0);
    const valorDAS = receita * (finalAliq / 100);

    return {
        resultado: {
            anexoNome: MOCKED_ANEXOS[data.anexo as keyof typeof MOCKED_ANEXOS].nome,
            aliqNominal: aliqNominal,
            deducao: deducao,
            aliqEfetiva: finalAliq,
            valorDAS: valorDAS
        },
        hash: 'SIMP-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
        memory: [
            { step: 1, description: 'Determinação da Faixa', formula: `RBT12: ${rbt12}`, result: 'Faixa encontrada' },
            { step: 2, description: 'Cálculo Alíquota Efetiva', formula: `[(${rbt12} x ${aliqNominal}%) - ${deducao}] / ${rbt12}`, result: `${finalAliq.toFixed(2)}%` },
            { step: 3, description: 'Cálculo do DAS', formula: `${receita} x ${finalAliq.toFixed(2)}%`, result: valorDAS.toFixed(2) }
        ],
        baseLegal: 'Lei Complementar nº 123/2006, Resolução CGSN nº 140/2018'
    };
};

export default function SimplesNacionalPage({ onBack }: { onBack: () => void }) {
    const [formData, setFormData] = useState({
        rbt12: '', receita: '', anexo: 'I', fatorR: ''
    });
    const [result, setResult] = useState<any>(null);
    const [history, setHistory] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('simples_history') || '[]');
        setHistory(saved);
    }, []);

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCalculate = (e: any) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            // Simulate calculation delay
            setTimeout(() => {
                const calcResult = calculateSimplesMock(formData);
                setResult(calcResult);

                const newHistory = [calcResult, ...history.slice(0, 49)];
                setHistory(newHistory);
                localStorage.setItem('simples_history', JSON.stringify(newHistory));
                setLoading(false);
            }, 500);
        } catch (err: any) {
            setError(err.message);
            setLoading(false);
        }
    };

    const fmt = (v: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v || 0);

    return (
        <ToolLayout title="Simples Nacional" description="Cálculo do DAS" onBack={onBack}>
            <div className="max-w-7xl mx-auto">
                {/* HEADER */}
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2.5 bg-emerald-500/10 rounded-xl">
                        <Building2 className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <h1 className="text-2xl font-bold text-foreground text-slate-900 dark:text-white">Simples Nacional</h1>
                            <span className="px-2 py-0.5 text-xs font-medium rounded bg-emerald-500/10 text-emerald-600">Regime</span>
                        </div>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Cálculo do DAS por Anexo • LC 123/2006</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 space-y-6">
                        {/* FORM */}
                        <form onSubmit={handleCalculate} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5 space-y-5 shadow-sm">

                            {/* Receita */}
                            <div>
                                <h2 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">Dados</h2>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Receita Bruta 12 meses (R$)</label>
                                        <input type="number" name="rbt12" value={formData.rbt12} onChange={handleChange}
                                            placeholder="480000.00" step="0.01" required
                                            className="w-full h-9 px-3 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 outline-none focus:ring-2 focus:ring-emerald-500" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Receita do Mês (R$)</label>
                                        <input type="number" name="receita" value={formData.receita} onChange={handleChange}
                                            placeholder="50000.00" step="0.01" required
                                            className="w-full h-9 px-3 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 outline-none focus:ring-2 focus:ring-emerald-500" />
                                    </div>
                                </div>
                            </div>

                            {/* Anexo */}
                            <div className="pt-4 border-t border-slate-100 dark:border-slate-700">
                                <h2 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">Anexo</h2>
                                <div className="grid grid-cols-5 gap-2">
                                    {Object.entries(MOCKED_ANEXOS).map(([key, val]) => (
                                        <label key={key} className={`flex flex-col items-center p-3 rounded-lg border cursor-pointer transition-colors ${formData.anexo === key ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20' : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'
                                            }`}>
                                            <input type="radio" name="anexo" value={key} checked={formData.anexo === key}
                                                onChange={handleChange} className="sr-only" />
                                            <span className="text-lg font-bold text-slate-900 dark:text-white">Anexo {key}</span>
                                            <span className="text-[10px] text-slate-500 dark:text-slate-400 text-center">{val.nome.replace('Anexo ' + key + ' - ', '')}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Fator R */}
                            {formData.anexo === 'V' && (
                                <div className="pt-4 border-t border-slate-100 dark:border-slate-700">
                                    <h2 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">Fator R</h2>
                                    <div>
                                        <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Fator R (Folha ÷ Receita)</label>
                                        <input type="number" name="fatorR" value={formData.fatorR} onChange={handleChange}
                                            placeholder="0.28" step="0.01" max="1"
                                            className="w-full h-9 px-3 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900" />
                                        <p className="text-xs text-slate-500 mt-1">Se ≥ 28%, tributação pelo Anexo III</p>
                                    </div>
                                </div>
                            )}

                            {error && <div className="p-3 bg-red-50 text-red-700 rounded-lg text-sm">{error}</div>}

                            <button type="submit" disabled={loading}
                                className="w-full h-11 text-sm font-semibold rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-emerald-200/50 dark:shadow-none transition-all">
                                <Calculator className="w-4 h-4" />
                                {loading ? 'Calculando...' : 'Calcular DAS'}
                            </button>
                        </form>

                        {/* RESULT */}
                        {result && (
                            <div className="space-y-4 animate-fade-in">
                                <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5 shadow-sm">
                                    <div className="flex items-center justify-between mb-4">
                                        <h2 className="text-sm font-semibold text-slate-900 dark:text-white">{result.resultado.anexoNome}</h2>
                                        <div className="flex items-center gap-2">
                                            <button onClick={() => navigator.clipboard.writeText(result.hash)} className="h-8 px-3 text-xs rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 flex items-center gap-1 transition-colors">
                                                <Copy className="w-3.5 h-3.5" /> Hash
                                            </button>
                                            <FeatureLock featureId="pdf_export" showUpgrade={false} fallback={
                                                <button className="h-8 px-3 text-xs rounded-lg border border-slate-200 dark:border-slate-700 opacity-50 cursor-not-allowed flex items-center gap-1 text-slate-500">
                                                    <Download className="w-3.5 h-3.5" /> PDF <Lock className="w-3 h-3 text-purple-500" />
                                                </button>
                                            }>
                                                <button className="h-8 px-3 text-xs rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 flex items-center gap-1">
                                                    <Download className="w-3.5 h-3.5" /> PDF
                                                </button>
                                            </FeatureLock>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-4 gap-3 mb-4">
                                        <div className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-3">
                                            <div className="text-xs text-slate-500 dark:text-slate-400">Alíq. Nominal</div>
                                            <div className="text-base font-bold text-slate-900 dark:text-white">{result.resultado.aliqNominal}%</div>
                                        </div>
                                        <div className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-3">
                                            <div className="text-xs text-slate-500 dark:text-slate-400">Dedução</div>
                                            <div className="text-base font-bold text-slate-900 dark:text-white">{fmt(result.resultado.deducao)}</div>
                                        </div>
                                        <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-lg p-3">
                                            <div className="text-xs text-emerald-600 dark:text-emerald-400">Alíq. Efetiva</div>
                                            <div className="text-base font-bold text-emerald-600 dark:text-emerald-400">{result.resultado.aliqEfetiva.toFixed(2)}%</div>
                                        </div>
                                        <div className="bg-emerald-600 rounded-lg p-3">
                                            <div className="text-xs text-white/80">DAS a Pagar</div>
                                            <div className="text-base font-bold text-white">{fmt(result.resultado.valorDAS)}</div>
                                        </div>
                                    </div>

                                    <div className="text-xs font-mono text-slate-400">{result.hash}</div>
                                </div>

                                {/* Memory */}
                                <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden bg-white dark:bg-slate-800">
                                    <div className="bg-slate-50 dark:bg-slate-900 px-4 py-2 flex items-center justify-between border-b border-slate-200 dark:border-slate-700">
                                        <span className="text-xs font-semibold text-slate-900 dark:text-white uppercase">Memória de Cálculo</span>
                                    </div>
                                    <table className="w-full text-sm">
                                        <thead className="bg-slate-50 dark:bg-slate-900/50">
                                            <tr>
                                                <th className="px-4 py-2 text-left text-xs font-medium text-slate-500 dark:text-slate-400 w-12">#</th>
                                                <th className="px-4 py-2 text-left text-xs font-medium text-slate-500 dark:text-slate-400">Descrição</th>
                                                <th className="px-4 py-2 text-left text-xs font-medium text-slate-500 dark:text-slate-400">Fórmula</th>
                                                <th className="px-4 py-2 text-right text-xs font-medium text-slate-500 dark:text-slate-400">Resultado</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {result.memory.map((step: any, idx: number) => (
                                                <tr key={idx} className="border-t border-slate-100 dark:border-slate-700">
                                                    <td className="px-4 py-2 text-xs text-slate-500 font-mono">{step.step}</td>
                                                    <td className="px-4 py-2 text-slate-700 dark:text-slate-300">{step.description}</td>
                                                    <td className="px-4 py-2 font-mono text-xs text-slate-500">{step.formula}</td>
                                                    <td className="px-4 py-2 text-right font-semibold text-slate-900 dark:text-white">{step.result}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <div className="bg-slate-50 dark:bg-slate-900 px-4 py-2 text-xs text-slate-500 border-t border-slate-200 dark:border-slate-700">
                                        {result.baseLegal}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* SIDEBAR */}
                    <div className="space-y-4">
                        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm">
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-2">
                                    <History className="w-4 h-4 text-slate-400" />
                                    <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Histórico</h3>
                                </div>
                                <span className="text-[10px] px-1.5 py-0.5 rounded bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 font-bold flex items-center gap-1">
                                    <Lock className="w-3 h-3" /> PRO
                                </span>
                            </div>
                            
                            <div className="space-y-2 max-h-[300px] overflow-y-auto">
                                {history.length === 0 ? (
                                    <p className="text-xs text-slate-500 text-center py-4">Nenhum cálculo recente</p>
                                ) : (
                                    history.slice(0, 5).map((h, i) => (
                                        <button key={i} className="w-full text-left p-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                                            <div className="flex justify-between text-xs mb-1">
                                                <span className="text-slate-500 dark:text-slate-400">{h.resultado.anexoNome}</span>
                                                <span className="font-semibold text-green-600 dark:text-green-400">{fmt(h.resultado.valorDAS)}</span>
                                            </div>
                                            <div className="text-[10px] font-mono text-slate-400 truncate">{h.hash}</div>
                                        </button>
                                    ))
                                )}
                            </div>
                        </div>

                        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4 text-sm text-green-800 dark:text-green-200">
                            <h4 className="font-semibold mb-2">📋 Anexos</h4>
                            <ul className="space-y-1 text-xs opacity-90">
                                <li>• I - Comércio</li>
                                <li>• II - Indústria</li>
                                <li>• III - Serviços</li>
                                <li>• IV - Serviços (sem INSS)</li>
                                <li>• V - Serviços (Fator R)</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </ToolLayout>
    );
}
