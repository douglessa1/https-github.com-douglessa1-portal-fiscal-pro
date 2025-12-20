import React from 'react';
import { ToolLayout, Card } from '../ToolShared';
import { FileSpreadsheet, Download } from 'lucide-react';

export default function GeradorDanfe({ onBack }: { onBack: () => void }) {
    return (
        <ToolLayout
            title="Gerador DANFE"
            description="Gere o Documento Auxiliar da Nota Fiscal Eletrônica em PDF"
            onBack={onBack}
        >
            <div className="space-y-6">
                <Card title="Gerar DANFE">
                    <div className="space-y-4">
                        <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-12 text-center">
                            <FileSpreadsheet size={64} className="mx-auto mb-4 text-slate-300 dark:text-slate-700" />
                            <p className="text-slate-600 dark:text-slate-400 mb-2">
                                Upload XML da NFe para gerar DANFE
                            </p>
                            <button className="mt-4 px-6 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-colors flex items-center gap-2 mx-auto">
                                <Download size={18} /> Selecionar XML
                            </button>
                        </div>
                    </div>
                </Card>

                <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
                        <div className="text-xs font-bold text-blue-700 dark:text-blue-300 mb-2">📄 Layout Padrão</div>
                        <div className="text-sm text-blue-800 dark:text-blue-200">
                            DANFE conforme Manual de Integração Versão 7.0
                        </div>
                    </div>
                    <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-xl p-4">
                        <div className="text-xs font-bold text-purple-700 dark:text-purple-300 mb-2">🔢 Código de Barras</div>
                        <div className="text-sm text-purple-800 dark:text-purple-200">
                            Chave de acesso e QR Code incluídos
                        </div>
                    </div>
                </div>

                <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4">
                    <strong>⚠️ Recurso em desenvolvimento:</strong> Gerador DANFE completo será implementado em breve.
                </div>
            </div>
        </ToolLayout>
    );
}
