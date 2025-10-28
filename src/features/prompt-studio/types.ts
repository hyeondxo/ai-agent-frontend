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
  maxTokens?: number;
  topP?: number;
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
  promptText: string;
  questions: TestQuestion[];
  onPromptTextChange: (text: string) => void;
  onQuestionsChange: (questions: TestQuestion[]) => void;
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

/**
 * 테스트 질문 인터페이스
 */
export interface TestQuestion {
  id: string;
  value: string;
}

/**
 * 프롬프트 생성 세트 (독립적인 설정 그룹)
 */
export interface PromptSet {
  id: string;
  templateId: string | null;
  promptText: string;
  questions: TestQuestion[];
  selectedModels: string[];
  advancedSettings: AdvancedSettings;
  isAdvancedOpen: boolean;
}

/**
 * PromptSetPagination 컴포넌트 Props
 */
export interface PromptSetPaginationProps {
  totalSets: number;
  activeIndex: number;
  onSetChange: (index: number) => void;
}
