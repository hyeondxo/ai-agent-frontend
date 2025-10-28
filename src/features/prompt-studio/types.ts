/**
 * Prompt Studio Feature Types
 * 프롬프트 엔지니어링 스튜디오의 타입 정의
 */

import { LucideIcon } from 'lucide-react';

/**
 * 프롬프트 템플릿 인터페이스
 */
export interface PromptTemplate {
  id: string;
  name: string;
  description: string;
  prompt: string;
  icon: LucideIcon;
  category?: string;
}

/**
 * 프롬프트 히스토리 아이템
 */
export interface PromptHistoryItem {
  id: string;
  name: string;
  quality: number;
  date: string;
  prompt?: string;
}

/**
 * AI 모델 정보
 */
export interface AIModel {
  id: string;
  name: string;
  price: string;
  speed: string;
  quality: string;
}

/**
 * 고급 설정
 */
export interface AdvancedSettings {
  temperature: number;
  maxTokens: number;
  topP: number;
  stopSequences?: string[];
}

/**
 * TemplateSelector 컴포넌트 Props
 */
export interface TemplateSelectorProps {
  templates: PromptTemplate[];
  selectedTemplate: string | null;
  onSelectTemplate: (templateId: string) => void;
  onAddCustomTemplate?: () => void;
}

/**
 * PromptHistory 컴포넌트 Props
 */
export interface PromptHistoryProps {
  history: PromptHistoryItem[];
  onSelectHistory?: (historyId: string | number) => void;
}

/**
 * PromptEditor 컴포넌트 Props
 */
export interface PromptEditorProps {
  selectedTemplate: string | null;
  templates: PromptTemplate[];
  onCopy?: () => void;
  onSave?: () => void;
}

/**
 * ModelSelector 컴포넌트 Props
 */
export interface ModelSelectorProps {
  models: AIModel[];
  selectedModels: string[];
  onToggleModel: (modelId: string) => void;
}

/**
 * AdvancedSettings 컴포넌트 Props
 */
export interface AdvancedSettingsProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  temperature: number[];
  onTemperatureChange: (value: number[]) => void;
}
