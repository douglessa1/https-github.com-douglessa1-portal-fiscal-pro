import React, { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { NewsFeed } from './components/NewsFeed';
import { TaxAdvisor } from './components/TaxAdvisor';
import { CreativeStudio } from './components/CreativeStudio';
import { DesignSystem } from './components/DesignSystem';
import { LandingPage } from './components/LandingPage';
import { ToolsHub } from './components/ToolsHub';
import { CommunityForum } from './components/CommunityForum';
import { AdminDashboard } from './components/AdminDashboard';
import { SubscriptionPlans } from './components/SubscriptionPlans';
import { Dashboard } from './components/Dashboard';
import { Settings } from './components/Settings';
import { FinancialModule } from './components/FinancialModule'; // New Module
import { NotificationsDropdown } from './components/NotificationsDropdown';
import { Bell, Search, User, ChevronDown, Moon, Sun, Menu } from 'lucide-react';

// Import Tools
import SimplesNacionalPage from './components/Tools/SimplesNacional';
import DifalCalculator from './components/Tools/DifalCalculator';
import NcmFinder from './components/Tools/NcmFinder';
import MeiDashboard from './components/Tools/MeiDashboard';
import IcmsStCalculator from './components/Tools/IcmsStCalculator';
import MvaAjustadaCalculator from './components/Tools/MvaAjustadaCalculator';
import PartilhaIcmsCalculator from './components/Tools/PartilhaIcmsCalculator';
import IbsCbsCalculator from './components/Tools/IbsCbsCalculator';
import TransicaoCalculator from './components/Tools/TransicaoCalculator';
import ComparadorRegimesCalculator from './components/Tools/ComparadorRegimesCalculator';
import CfopConsulta from './components/Tools/CfopConsulta';
import CestConsulta from './components/Tools/CestConsulta';
import AliquotasEstado from './components/Tools/AliquotasEstado';
import MargemMarkupCalculator from './components/Tools/MargemMarkupCalculator';
import PisCofinsCalculator from './components/Tools/PisCofinsCalculator';
import XmlViewer from './components/Tools/XmlViewer';
import CalendarioFiscal from './components/Tools/CalendarioFiscal';
import HistoricoSimulacoes from './components/Tools/HistoricoSimulacoes';
import ValidadorNfe from './components/Tools/ValidadorNfe';
import GeradorDanfe from './components/Tools/GeradorDanfe';
import AuditorSped from './components/Tools/AuditorSped';
import GeradorGuias from './components/Tools/GeradorGuias';
import RetencoesCalculator from './components/Tools/RetencoesCalculator';
import IrpjCsllCalculator from './components/Tools/IrpjCsllCalculator';
import SplitPaymentCalculator from './components/Tools/SplitPaymentCalculator';
import AlertasFiscais from './components/Tools/AlertasFiscais';
import MonitorNfe from './components/Tools/MonitorNfe';
import ValidadorCreditos from './components/Tools/ValidadorCreditos';
import ExportadorRelatorios from './components/Tools/ExportadorRelatorios';
import TabelasSimplesNacional from './components/Tools/TabelasSimplesNacional';
import LucroRealPresumidoCalculator from './components/Tools/LucroRealPresumidoCalculator';

export default function App() {
  // Função para ler estado inicial do Hash ou localStorage
  const getInitialView = () => {
    // Prioridade 1: URL Hash
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      // Exemplo: #/tools/simples-nacional
      if (hash.startsWith('/tools/')) {
        const toolId = hash.replace('/tools/', '');
        return { showLanding: false, activeTab: 'tools', activeTool: toolId };
      }
      // Exemplo: #/app
      if (hash === '/app') {
        return { showLanding: false, activeTab: 'dashboard', activeTool: null };
      }
      // Outras tabs: #/consultor-ia, #/noticias, etc
      if (hash.startsWith('/')) {
        const tab = hash.replace('/', '');
        return { showLanding: false, activeTab: tab, activeTool: null };
      }
    }

    // Prioridade 2: localStorage (última view)
    const saved = localStorage.getItem('portal_fiscal_state');
    if (saved) {
      try {
        const state = JSON.parse(saved);
        return state;
      } catch (e) {
        console.warn('Failed to parse saved state:', e);
      }
    }

    // Prioridade 3: Default (Landing)
    return { showLanding: true, activeTab: 'dashboard', activeTool: null };
  };

  const initialState = getInitialView();
  const [showLanding, setShowLanding] = useState(initialState.showLanding);
  const [activeTab, setActiveTab] = useState(initialState.activeTab);
  const [activeTool, setActiveTool] = useState<string | null>(initialState.activeTool);
  const [darkMode, setDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);

  // New States for Features
  const [currentCompany, setCurrentCompany] = useState("Consultoria Matriz - SP");
  const [customNews, setCustomNews] = useState<any[]>([]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Sincronizar estado com URL Hash e localStorage
  useEffect(() => {
    // Construir hash baseado no estado atual
    let newHash = '';

    if (showLanding) {
      newHash = ''; // Landing = sem hash
    } else if (activeTool) {
      newHash = `/tools/${activeTool}`;
    } else if (activeTab === 'dashboard') {
      newHash = '/app';
    } else {
      newHash = `/${activeTab}`;
    }

    // Atualizar URL sem reload
    if (newHash) {
      window.location.hash = newHash;
    } else {
      // Limpar hash na landing
      if (window.location.hash) {
        history.replaceState(null, '', ' ');
      }
    }

    // Salvar no localStorage
    localStorage.setItem('portal_fiscal_state', JSON.stringify({
      showLanding,
      activeTab,
      activeTool
    }));
  }, [showLanding, activeTab, activeTool]);

  // Suporte ao botão Voltar do navegador
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');

      if (!hash) {
        // Sem hash = Landing
        setShowLanding(true);
        setActiveTab('dashboard');
        setActiveTool(null);
      } else if (hash.startsWith('/tools/')) {
        // Hash de ferramenta
        const toolId = hash.replace('/tools/', '');
        setShowLanding(false);
        setActiveTab('tools');
        setActiveTool(toolId);
      } else if (hash === '/app') {
        // Hash do app
        setShowLanding(false);
        setActiveTab('dashboard');
        setActiveTool(null);
      } else {
        // Outras tabs
        const tab = hash.replace('/', '');
        setShowLanding(false);
        setActiveTab(tab);
        setActiveTool(null);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setActiveTool(null);
  }

  const handleToolSelect = (toolId: string) => {
    setActiveTool(toolId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Callback to add news from Admin Panel
  const handlePostNews = (newsItem: any) => {
    setCustomNews([newsItem, ...customNews]);
  };

  if (showLanding) {
    return <LandingPage onEnterApp={() => setShowLanding(false)} />;
  }

  const renderContent = () => {
    // Tool routing
    if (activeTab === 'tools' && activeTool) {
      switch (activeTool) {
        case 'simples-nacional': return <SimplesNacionalPage onBack={() => setActiveTool(null)} />;
        case 'difal': return <DifalCalculator onBack={() => setActiveTool(null)} />;
        case 'ncm-finder': return <NcmFinder onBack={() => setActiveTool(null)} />;
        case 'mei-das': return <MeiDashboard onBack={() => setActiveTool(null)} />;
        case 'icms-st': return <IcmsStCalculator onBack={() => setActiveTool(null)} />;
        case 'mva-ajustada': return <MvaAjustadaCalculator onBack={() => setActiveTool(null)} />;
        case 'partilha-icms': return <PartilhaIcmsCalculator onBack={() => setActiveTool(null)} />;
        case 'ibs-cbs': return <IbsCbsCalculator onBack={() => setActiveTool(null)} />;
        case 'transicao': return <TransicaoCalculator onBack={() => setActiveTool(null)} />;
        case 'comparador-regimes': return <ComparadorRegimesCalculator onBack={() => setActiveTool(null)} />;
        case 'cfop': return <CfopConsulta onBack={() => setActiveTool(null)} />;
        case 'cest': return <CestConsulta onBack={() => setActiveTool(null)} />;
        case 'aliquotas-estado': return <AliquotasEstado onBack={() => setActiveTool(null)} />;
        case 'margem-markup': return <MargemMarkupCalculator onBack={() => setActiveTool(null)} />;
        case 'pis-cofins': return <PisCofinsCalculator onBack={() => setActiveTool(null)} />;
        case 'xml-viewer': return <XmlViewer onBack={() => setActiveTool(null)} />;
        case 'calendario-fiscal': return <CalendarioFiscal onBack={() => setActiveTool(null)} />;
        case 'historico': return <HistoricoSimulacoes onBack={() => setActiveTool(null)} />;
        case 'validador-nfe': return <ValidadorNfe onBack={() => setActiveTool(null)} />;
        case 'gerador-danfe': return <GeradorDanfe onBack={() => setActiveTool(null)} />;
        case 'auditor-sped': return <AuditorSped onBack={() => setActiveTool(null)} />;
        case 'gerador-guias': return <GeradorGuias onBack={() => setActiveTool(null)} />;
        case 'retencoes': return <RetencoesCalculator onBack={() => setActiveTool(null)} />;
        case 'irpj-csll': return <IrpjCsllCalculator onBack={() => setActiveTool(null)} />;
        case 'split-payment': return <SplitPaymentCalculator onBack={() => setActiveTool(null)} />;
        case 'alertas': return <AlertasFiscais onBack={() => setActiveTool(null)} />;
        case 'monitor-nfe': return <MonitorNfe onBack={() => setActiveTool(null)} />;
        case 'validador-creditos': return <ValidadorCreditos onBack={() => setActiveTool(null)} />;
        case 'exportador': return <ExportadorRelatorios onBack={() => setActiveTool(null)} />;
        case 'tabelas-simples': return <TabelasSimplesNacional onBack={() => setActiveTool(null)} />;
        case 'lucro-real-presumido': return <LucroRealPresumidoCalculator onBack={() => setActiveTool(null)} />;
        case 'consultor-ia':
          setActiveTab('advisor');
          setActiveTool(null);
          return <TaxAdvisor />;
        default:
          return (
            <div className="text-center py-20 animate-fade-in-up">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Em Desenvolvimento</h2>
              <p className="text-slate-500 mt-2">A ferramenta <strong>{activeTool}</strong> será implementada em breve.</p>
              <button onClick={() => setActiveTool(null)} className="mt-6 px-4 py-2 bg-slate-200 dark:bg-slate-700 rounded-lg text-sm font-bold">Voltar</button>
            </div>
          );
      }
    }

    // Main Tab Routing
    switch (activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'news': return <NewsFeed customNews={customNews} />;
      case 'finance': return <FinancialModule currentCompany={currentCompany} />; // New Financial Tab
      case 'advisor': return <TaxAdvisor />;
      case 'studio': return <CreativeStudio />;
      case 'design': return <DesignSystem />;
      case 'tools': return <ToolsHub onSelectTool={handleToolSelect} />;
      case 'forum': return <CommunityForum />;
      case 'admin': return <AdminDashboard onPostNews={handlePostNews} />; // Pass handler
      case 'plans': return <SubscriptionPlans />;
      case 'settings': return <Settings />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] dark:bg-slate-950 font-sans selection:bg-emerald-100 selection:text-emerald-900 transition-colors duration-300">

      <Navigation
        currentTab={activeTab}
        onTabChange={handleTabChange}
        isOpen={isSidebarOpen}
        currentCompany={currentCompany}
        onCompanyChange={setCurrentCompany}
      />

      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative transition-all duration-300">
        {/* Glass Header */}
        <header className="h-20 glass sticky top-0 z-40 px-6 flex items-center justify-between transition-colors duration-300">
          <div className="flex items-center gap-4 flex-1 max-w-2xl">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 -ml-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors"
              title={isSidebarOpen ? "Recolher Menu" : "Expandir Menu"}
            >
              <Menu size={24} />
            </button>

            <div className="relative w-full max-w-md group hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={18} />
              <input
                type="text"
                placeholder={`Buscar em ${currentCompany}...`}
                className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl py-2.5 pl-10 pr-4 text-sm text-slate-700 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all shadow-sm"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                <span className="text-[10px] bg-slate-100 dark:bg-slate-700 text-slate-400 dark:text-slate-300 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-600">⌘K</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 md:gap-6">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="text-slate-400 hover:text-emerald-500 transition-colors p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className={`relative text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 ${showNotifications ? 'bg-slate-100 dark:bg-slate-800 text-emerald-500' : ''}`}
              >
                <Bell size={20} />
                <span className="absolute top-1.5 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900 animate-pulse"></span>
              </button>
              {showNotifications && <NotificationsDropdown onClose={() => setShowNotifications(false)} />}
            </div>

            <div className="flex items-center gap-3 pl-6 border-l border-slate-200 dark:border-slate-700">
              <div className="text-right hidden md:block">
                <p className="text-sm font-bold text-slate-900 dark:text-slate-100 leading-tight">Douglas S.</p>
                <p className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">Premium</p>
              </div>
              <button className="w-10 h-10 bg-slate-900 dark:bg-slate-700 rounded-full flex items-center justify-center text-white shadow-md hover:ring-4 hover:ring-slate-100 dark:hover:ring-slate-800 transition-all">
                <User size={18} />
              </button>
              <ChevronDown size={14} className="text-slate-400 cursor-pointer hidden md:block" onClick={() => setActiveTab('settings')} />
            </div>
          </div>
        </header>

        {/* Content Scroll Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth">
          <div className={`mx-auto pb-12 transition-all duration-300 ${isSidebarOpen ? 'max-w-7xl' : 'max-w-[1600px]'}`}>
            {renderContent()}
          </div>
        </div>
      </main>
    </div>
  );
}
