import React, { useState } from 'react';
import { ToolLayout, Card, Button, FormInput, ResultCard } from '../ToolShared';
import { DollarSign, TrendingUp, AlertTriangle, Download, Calendar } from 'lucide-react';

export default function MeiDashboard({ onBack }: { onBack: () => void }) {
    const [receitaAtual, setReceitaAtual] = useState(58400); // Mock starting value
    const [inputValue, setInputValue] = useState('');
    
    const LIMITE_ANUAL = 81000;
    const LIMITE_MENSAL_MEDIO = 6750;
    
    const percentualUso = (receitaAtual / LIMITE_ANUAL) * 100;
    const restante = LIMITE_ANUAL - receitaAtual;

    const addReceita = () => {
        if (!inputValue) return;
        setReceitaAtual(prev => prev + parseFloat(inputValue));
        setInputValue('');
    };

    const fmt = (v: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v);

    return (
        <ToolLayout 
            title="Painel do MEI" 
            description="Controle de faturamento, emissão de DAS e monitoramento de limites."
            onBack={onBack}
        >
            <div className="grid lg:grid-cols-3 gap-8">
                {/* Main Stats */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                        <Card className="bg-gradient-to-br from-emerald-600 to-emerald-800 text-white border-none">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                                    <TrendingUp size={24} className="text-white" />
                                </div>
                                <span className="text-xs font-bold bg-white/20 px-2 py-1 rounded">2024</span>
                            </div>
                            <p className="text-emerald-100 text-sm font-medium mb-1">Faturamento Acumulado</p>
                            <h2 className="text-4xl font-extrabold mb-4">{fmt(receitaAtual)}</h2>
                            <div className="w-full bg-black/20 rounded-full h-2 mb-2">
                                <div 
                                    className={`h-2 rounded-full transition-all duration-1000 ${percentualUso > 80 ? 'bg-yellow-400' : 'bg-white'}`} 
                                    style={{ width: `${Math.min(percentualUso, 100)}%` }}
                                ></div>
                            </div>
                            <p className="text-xs text-emerald-100">
                                {percentualUso.toFixed(1)}% do limite de R$ 81k utilizado.
                            </p>
                        </Card>

                        <div className="grid grid-rows-2 gap-4">
                            <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm flex items-center justify-between">
                                <div>
                                    <p className="text-xs font-bold text-slate-500 uppercase">Limite Restante</p>
                                    <p className={`text-2xl font-bold ${restante < 10000 ? 'text-amber-500' : 'text-slate-900 dark:text-white'}`}>
                                        {fmt(restante)}
                                    </p>
                                </div>
                                <div className="h-10 w-10 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center text-slate-400">
                                    <DollarSign size={20} />
                                </div>
                            </div>
                            <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm flex items-center justify-between">
                                <div>
                                    <p className="text-xs font-bold text-slate-500 uppercase">Média Mensal</p>
                                    <p className="text-2xl font-bold text-slate-900 dark:text-white">
                                        {fmt(receitaAtual / 10)}
                                    </p>
                                </div>
                                <div className="h-10 w-10 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center text-slate-400">
                                    <Calendar size={20} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Add Revenue */}
                    <Card title="Registrar Nova Receita">
                        <div className="flex gap-4 items-end">
                            <div className="flex-1">
                                <FormInput 
                                    label="Valor da Nota Fiscal / Recebimento" 
                                    placeholder="Ex: 1500.00" 
                                    type="number"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                />
                            </div>
                            <div className="flex-1">
                                <FormInput 
                                    label="Descrição (Opcional)" 
                                    placeholder="Ex: Serviço Prestado Cliente X" 
                                />
                            </div>
                            <Button onClick={addReceita} className="h-12 px-6">
                                Adicionar
                            </Button>
                        </div>
                    </Card>

                    {/* Warning Area */}
                    {percentualUso > 80 && (
                        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4 flex items-start gap-4">
                            <AlertTriangle className="text-amber-600 shrink-0 mt-1" />
                            <div>
                                <h4 className="font-bold text-amber-800 dark:text-amber-200">Atenção ao Desenquadramento</h4>
                                <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
                                    Você ultrapassou 80% do limite anual. Se exceder R$ 81.000,00 em até 20%, deverá recolher DAS complementar. Acima de 20%, o desenquadramento é retroativo.
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Sidebar Actions */}
                <div className="space-y-6">
                    <Card title="Acesso Rápido">
                        <div className="space-y-3">
                            <button className="w-full p-3 bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl text-left text-sm font-medium transition-colors flex items-center justify-between group">
                                Emitir DAS (PGMEI)
                                <Download size={16} className="text-slate-400 group-hover:text-emerald-500" />
                            </button>
                            <button className="w-full p-3 bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl text-left text-sm font-medium transition-colors flex items-center justify-between group">
                                Declaração Anual (DASN)
                                <Download size={16} className="text-slate-400 group-hover:text-emerald-500" />
                            </button>
                            <button className="w-full p-3 bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl text-left text-sm font-medium transition-colors flex items-center justify-between group">
                                Relatório de Receitas
                                <Download size={16} className="text-slate-400 group-hover:text-emerald-500" />
                            </button>
                        </div>
                    </Card>

                    <div className="bg-slate-900 rounded-2xl p-6 text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 rounded-full blur-2xl"></div>
                        <h3 className="font-bold text-lg mb-2 relative z-10">Precisa de Ajuda?</h3>
                        <p className="text-slate-400 text-sm mb-4 relative z-10">
                            Nossa IA pode analisar se vale a pena migrar para ME (Simples Nacional).
                        </p>
                        <button className="w-full py-2 bg-emerald-600 rounded-xl font-bold text-sm hover:bg-emerald-500 transition-colors relative z-10">
                            Consultar IA
                        </button>
                    </div>
                </div>
            </div>
        </ToolLayout>
    );
}