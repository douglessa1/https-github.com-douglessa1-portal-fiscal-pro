import React, { useState } from 'react';
import { Search, Lock, Zap, ShieldCheck, ArrowRight, Calculator, FileText, Scale, TrendingUp, BarChart3, GraduationCap, ArrowRightLeft, Package, User } from 'lucide-react';

type ToolTier = 'Gratuito' | 'Pro' | 'Auditor';

interface Tool {
  id: string;
  title: string;
  description: string;
  tier: ToolTier;
  icon: React.ElementType;
  isNew?: boolean;
}

interface ToolsHubProps {
  onSelectTool: (toolId: string) => void;
}

export const ToolsHub: React.FC<ToolsHubProps> = ({ onSelectTool }) => {
  const [filter, setFilter] = useState<'Todos' | ToolTier>('Todos');

  const tools: Tool[] = [
    // ICMS (5 tools)
    { id: 'icms-st', title: 'ICMS-ST Calculator', description: 'Cálculo de Substituição Tributária com base dupla e MVA.', tier: 'Pro', icon: Calculator },
    { id: 'mva-ajustada', title: 'MVA Ajustada', description: 'Ajuste de MVA para operações interestaduais.', tier: 'Pro', icon: TrendingUp },
    { id: 'partilha-icms', title: 'Partilha ICMS (EC 87/2015)', description: 'Cálculo DIFAL com partilha origem/destino.', tier: 'Pro', icon: ArrowRightLeft },
    { id: 'ibs-cbs', title: 'IBS/CBS Simulator', description: 'Simulador da Reforma Tributária 2026-2033.', tier: 'Auditor', icon: Zap, isNew: true },
    { id: 'transicao', title: 'Transição 2026-2033', description: 'Timeline da transição tributária com cálculo proporcional.', tier: 'Auditor', icon: BarChart3, isNew: true },

    // Simples Nacional & MEI (3 tools)
    { id: 'simples-nacional', title: 'Simples Nacional', description: 'Simulação de alíquotas por anexo e faixa de faturamento.', tier: 'Gratuito', icon: Calculator },
    { id: 'mei-das', title: 'MEI Dashboard', description: 'Controle de receitas, limite e geração de DAS.', tier: 'Gratuito', icon: User },
    { id: 'comparador-regimes', title: 'Comparador de Regimes', description: 'Compare Simples, Presumido e Real lado a lado.', tier: 'Pro', icon: ArrowRightLeft },

    // Consultas (6 tools)
    { id: 'ncm-finder', title: 'NCM Finder', description: 'Busca inteligente de códigos NCM com alíquotas IPI.', tier: 'Gratuito', icon: Package },
    { id: 'cfop-consulta', title: 'CFOP Consulta', description: 'Tabela completa de CFOPs com busca e filtros.', tier: 'Gratuito', icon: FileText },
    { id: 'cest-consulta', title: 'CEST Consulta', description: 'Consulta de códigos CEST por NCM e descrição.', tier: 'Gratuito', icon: FileText },
    { id: 'aliquotas-estado', title: 'Alíquotas por Estado', description: 'ICMS interno, interestadual e FCP de todos os estados.', tier: 'Gratuito', icon: Scale },
    { id: 'tabelas-simples', title: 'Tabelas Simples Nacional', description: 'Anexos I, II, III com faixas e deduções.', tier: 'Gratuito', icon: FileText },
    { id: 'calendario-fiscal', title: 'Calendário Fiscal', description: 'Obrigações mensais com alertas de vencimento.', tier: 'Gratuito', icon: FileText },

    // Calculadoras Federais (5 tools)
    { id: 'pis-cofins', title: 'PIS/COFINS Calculator', description: 'Cumulativo e não-cumulativo com créditos.', tier: 'Pro', icon: Calculator },
    { id: 'retencoes', title: 'Retenções na Fonte', description: 'IRRF, CSLL, PIS, COFINS e INSS sobre serviços.', tier: 'Pro', icon: Calculator },
    { id: 'irpj-csll', title: 'IRPJ/CSLL', description: 'Cálculo com adicional de 10% e base presumida.', tier: 'Pro', icon: Calculator },
    { id: 'lucro-real-presumido', title: 'Lucro Real vs Presumido', description: 'Comparação completa com economia anual.', tier: 'Pro', icon: ArrowRightLeft },
    { id: 'margem-markup', title: 'Margem/Markup', description: 'Conversão bidirecional e cálculo de preço de venda.', tier: 'Gratuito', icon: TrendingUp },

    // Validadores & XML (4 tools)
    { id: 'xml-viewer', title: 'XML Viewer', description: 'Visualizador de arquivos XML NFe, CTe, etc.', tier: 'Pro', icon: FileText },
    { id: 'validador-nfe', title: 'Validador NFe', description: 'Validação de schema e regras de negócio.', tier: 'Auditor', icon: ShieldCheck },
    { id: 'auditor-sped', title: 'Auditor SPED', description: 'Análise de arquivos SPED Fiscal e Contribuições.', tier: 'Auditor', icon: ShieldCheck },
    { id: 'validador-creditos', title: 'Validador Créditos PIS/COFINS', description: 'Verifique direito a créditos no regime não-cumulativo.', tier: 'Pro', icon: ShieldCheck },

    // Geradores (4 tools)
    { id: 'gerador-danfe', title: 'Gerador DANFE', description: 'Geração de DANFE a partir de XML NFe.', tier: 'Auditor', icon: FileText },
    { id: 'gerador-guias', title: 'Gerador de Guias', description: 'DAS, DARF, GNRE e GPS com código de barras.', tier: 'Pro', icon: FileText },
    { id: 'split-payment', title: 'Split Payment', description: 'Simulador do pagamento segregado da Reforma.', tier: 'Auditor', icon: ArrowRightLeft, isNew: true },
    { id: 'exportador', title: 'Exportador Relatórios', description: 'Exporte cálculos em PDF, Excel e CSV.', tier: 'Pro', icon: FileText },

    // Monitoramento (3 tools)
    { id: 'monitor-nfe', title: 'Monitor NFe', description: 'Dashboard de emissão e autorização de notas.', tier: 'Auditor', icon: BarChart3 },
    { id: 'alertas', title: 'Alertas Fiscais', description: 'Notificações de vencimentos e mudanças legislativas.', tier: 'Pro', icon: Zap },
    { id: 'historico', title: 'Histórico Simulações', description: 'Últimos 50 cálculos com hash de auditoria.', tier: 'Gratuito', icon: FileText },

    // Extras
    { id: 'difal', title: 'DIFAL Calculator', description: 'Diferencial de Alíquota ICMS (LC 190/2022).', tier: 'Pro', icon: ArrowRightLeft },
    { id: 'consultor-ia', title: 'Consultor Fiscal AI', description: 'Análise de cenários complexos com Gemini 1.5 Pro.', tier: 'Pro', icon: Zap },
  ];

  const filteredTools = filter === 'Todos' ? tools : tools.filter(t => t.tier === filter);

  const getTierColor = (tier: ToolTier) => {
    switch (tier) {
      case 'Gratuito': return 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400';
      case 'Pro': return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400';
      case 'Auditor': return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400';
    }
  };

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Central de Ferramentas</h1>
          <p className="text-slate-500 dark:text-slate-400">Soluções especializadas para cada nível de atuação.</p>
        </div>

        {/* Filter Pills */}
        <div className="flex p-1 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
          {(['Todos', 'Gratuito', 'Pro', 'Auditor'] as const).map((item) => (
            <button
              key={item}
              onClick={() => setFilter(item)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${filter === item
                  ? 'bg-slate-900 dark:bg-slate-700 text-white shadow-md'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTools.map((tool) => (
          <div
            key={tool.id}
            onClick={() => onSelectTool(tool.id)}
            className="group bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden cursor-pointer"
          >
            <div className="absolute top-0 right-0 p-4">
              <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider ${getTierColor(tool.tier)}`}>
                {tool.tier}
              </span>
            </div>

            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-colors ${tool.tier === 'Auditor' ? 'bg-purple-50 dark:bg-purple-900/20 text-purple-600' :
                tool.tier === 'Pro' ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600' :
                  'bg-slate-50 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
              }`}>
              <tool.icon size={24} />
            </div>

            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors flex items-center gap-2">
              {tool.title}
              {tool.isNew && <span className="text-[10px] bg-red-100 text-red-600 px-1.5 rounded font-bold uppercase">Novo</span>}
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
              {tool.description}
            </p>

            <div className="flex items-center text-sm font-semibold text-slate-400 group-hover:text-slate-900 dark:text-slate-500 dark:group-hover:text-white transition-colors">
              Acessar Ferramenta <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
