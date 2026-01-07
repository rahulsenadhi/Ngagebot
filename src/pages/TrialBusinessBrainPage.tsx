import { useEffect, useState } from 'react';
import { FileText, Table, Upload, Trash2, AlertCircle, Info, Lock } from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import TrialBanner from '../components/trial/TrialBanner';
import UpgradeModal from '../components/trial/UpgradeModal';
import FeatureLock from '../components/trial/FeatureLock';
import { useTrial } from '../contexts/TrialContext';
import { supabase } from '../lib/supabase';
import { Document } from '../types';

export default function TrialBusinessBrainPage() {
  const { workspace, usageStats, trialStatus, canUseFeature } = useTrial();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [excelFiles, setExcelFiles] = useState<Document[]>([]);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchDocuments();
  }, [workspace]);

  const fetchDocuments = async () => {
    if (!workspace) return;

    const { data: docs } = await supabase
      .from('documents')
      .select('*')
      .eq('workspace_id', workspace.id)
      .eq('document_type', 'document')
      .order('created_at', { ascending: false });

    const { data: excel } = await supabase
      .from('documents')
      .select('*')
      .eq('workspace_id', workspace.id)
      .eq('document_type', 'excel')
      .order('created_at', { ascending: false });

    if (docs) setDocuments(docs);
    if (excel) setExcelFiles(excel);
  };

  const handleFileUpload = async (file: File, type: 'document' | 'excel') => {
    if (!workspace) return;

    const canUpload = type === 'document'
      ? canUseFeature('upload_document')
      : canUseFeature('upload_excel');

    if (!canUpload) {
      setShowUpgradeModal(true);
      return;
    }

    setUploading(true);
    try {
      await supabase.from('documents').insert({
        workspace_id: workspace.id,
        file_name: file.name,
        file_type: file.type,
        file_size: file.size,
        storage_path: `/uploads/${workspace.id}/${file.name}`,
        document_type: type,
      });

      fetchDocuments();
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (documentId: string) => {
    try {
      await supabase.from('documents').delete().eq('id', documentId);
      fetchDocuments();
    } catch (error) {
      console.error('Error deleting document:', error);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const documentsRemaining = (trialStatus?.limits.maxDocuments || 5) - (usageStats?.documentsUploaded || 0);
  const excelRemaining = (trialStatus?.limits.maxExcelFiles || 1) - (usageStats?.excelUploaded || 0);

  return (
    <DashboardLayout>
      <div className="p-6 max-w-7xl mx-auto">
        <TrialBanner />

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Business Brain</h1>
          <p className="text-gray-400">
            Upload your business data to train your AI assistant
          </p>
        </div>

        <div className="bg-primary-blue/10 border border-primary-blue/30 rounded-lg p-4 mb-6 flex items-start gap-3">
          <Info className="w-5 h-5 text-primary-blue flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-white mb-1">
              How Business Brain Works
            </h3>
            <p className="text-sm text-gray-300">
              Upload documents and Excel files containing your business information, FAQs, product
              details, and policies. Your AI assistant will use only this data to answer customer
              questions accurately.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-dark-surface border border-dark-border rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <FileText className="w-6 h-6 text-primary-blue" />
                <h2 className="text-xl font-bold text-white">Documents</h2>
              </div>
              <span className="text-sm text-gray-400">
                {documents.length} / {trialStatus?.limits.maxDocuments || 5}
              </span>
            </div>

            {documentsRemaining > 0 ? (
              <div className="mb-4">
                <label className="block">
                  <div className="border-2 border-dashed border-dark-border rounded-lg p-6 text-center hover:border-primary-blue/50 transition-all cursor-pointer bg-dark-bg">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-300 mb-1">
                      Drag and drop or click to upload
                    </p>
                    <p className="text-xs text-gray-500">
                      PDF, DOCX, TXT (Max 10MB)
                    </p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept=".pdf,.docx,.txt"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileUpload(file, 'document');
                    }}
                    disabled={uploading}
                  />
                </label>
              </div>
            ) : (
              <div className="mb-4 p-4 bg-orange-500/10 border border-orange-500/30 rounded-lg flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-orange-400 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm text-orange-400 font-semibold">
                    Document limit reached
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Upgrade to upload unlimited documents
                  </p>
                </div>
                <button
                  onClick={() => setShowUpgradeModal(true)}
                  className="px-3 py-1 bg-orange-500 text-white rounded text-xs font-semibold hover:bg-orange-600 transition-colors"
                >
                  Upgrade
                </button>
              </div>
            )}

            <div className="space-y-2">
              {documents.length === 0 ? (
                <div className="text-center py-8">
                  <FileText className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                  <p className="text-gray-400 text-sm">No documents uploaded yet</p>
                </div>
              ) : (
                documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between p-3 bg-dark-bg rounded-lg hover:bg-dark-bg/50 transition-all"
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="p-2 bg-primary-blue/20 rounded-lg">
                        <FileText className="w-5 h-5 text-primary-blue" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-white truncate">{doc.file_name}</h3>
                        <p className="text-xs text-gray-400">
                          {formatFileSize(doc.file_size)} • {new Date(doc.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDelete(doc.id)}
                      className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="bg-dark-surface border border-dark-border rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Table className="w-6 h-6 text-accent-green" />
                <h2 className="text-xl font-bold text-white">Excel Files</h2>
              </div>
              <span className="text-sm text-gray-400">
                {excelFiles.length} / {trialStatus?.limits.maxExcelFiles || 1}
              </span>
            </div>

            {excelRemaining > 0 ? (
              <div className="mb-4">
                <label className="block">
                  <div className="border-2 border-dashed border-dark-border rounded-lg p-6 text-center hover:border-accent-green/50 transition-all cursor-pointer bg-dark-bg">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-300 mb-1">
                      Drag and drop or click to upload
                    </p>
                    <p className="text-xs text-gray-500">
                      XLSX, XLS (Max 10MB)
                    </p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept=".xlsx,.xls"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileUpload(file, 'excel');
                    }}
                    disabled={uploading}
                  />
                </label>
              </div>
            ) : (
              <div className="mb-4 p-4 bg-orange-500/10 border border-orange-500/30 rounded-lg flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-orange-400 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm text-orange-400 font-semibold">
                    Excel limit reached
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Upgrade to upload more Excel files
                  </p>
                </div>
                <button
                  onClick={() => setShowUpgradeModal(true)}
                  className="px-3 py-1 bg-orange-500 text-white rounded text-xs font-semibold hover:bg-orange-600 transition-colors"
                >
                  Upgrade
                </button>
              </div>
            )}

            <div className="space-y-2">
              {excelFiles.length === 0 ? (
                <div className="text-center py-8">
                  <Table className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                  <p className="text-gray-400 text-sm">No Excel files uploaded yet</p>
                </div>
              ) : (
                excelFiles.map((file) => (
                  <div
                    key={file.id}
                    className="flex items-center justify-between p-3 bg-dark-bg rounded-lg hover:bg-dark-bg/50 transition-all"
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="p-2 bg-accent-green/20 rounded-lg">
                        <Table className="w-5 h-5 text-accent-green" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-white truncate">{file.file_name}</h3>
                        <p className="text-xs text-gray-400">
                          {formatFileSize(file.file_size)} • {new Date(file.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDelete(file.id)}
                      className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <FeatureLock
            title="Knowledge Base Search"
            description="Upgrade to search and organize your documents with AI-powered search"
            locked={true}
          >
            <div className="bg-dark-surface border border-dark-border rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Search Documents</h3>
              <input
                type="text"
                placeholder="Search your knowledge base..."
                className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg text-white"
                disabled
              />
            </div>
          </FeatureLock>

          <FeatureLock
            title="Auto-Categorization"
            description="Upgrade to automatically categorize and tag your documents"
            locked={true}
          >
            <div className="bg-dark-surface border border-dark-border rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Document Categories</h3>
              <div className="space-y-2">
                {['FAQs', 'Product Info', 'Policies', 'Guides'].map((cat) => (
                  <div key={cat} className="p-3 bg-dark-bg rounded-lg">
                    <span className="text-gray-400">{cat}</span>
                  </div>
                ))}
              </div>
            </div>
          </FeatureLock>
        </div>
      </div>

      <UpgradeModal isOpen={showUpgradeModal} onClose={() => setShowUpgradeModal(false)} />
    </DashboardLayout>
  );
}
