import { useState, useRef, useEffect } from 'react';
import { useAgent } from '@/contexts/AgentContext';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PageHeader } from '@/components/common';
import { MessageSquare, Send, Trash2, Bot, User, Loader2 } from 'lucide-react';
import type { ChatMessage } from '@/types';

/**
 * Playground page component
 * Allows users to test their agents in a chat interface
 */
export function PlaygroundPage() {
  const { agents } = useAgent();
  const [selectedAgentId, setSelectedAgentId] = useState<string>('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-select first agent if none selected
  useEffect(() => {
    if (!selectedAgentId && agents.length > 0) {
      setSelectedAgentId(agents[0].id);
    }
  }, [agents, selectedAgentId]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Get selected agent
  const selectedAgent = agents.find((agent) => agent.id === selectedAgentId);

  /**
   * Generate mock AI response based on user input
   */
  const generateMockResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    // Simple keyword-based responses
    if (lowerMessage.includes('안녕') || lowerMessage.includes('hello')) {
      return `안녕하세요! 저는 ${selectedAgent?.name} 에이전트입니다. 무엇을 도와드릴까요?`;
    }

    if (lowerMessage.includes('이름') || lowerMessage.includes('name')) {
      return `제 이름은 ${selectedAgent?.name}입니다. ${selectedAgent?.description || '다양한 작업을 도와드릴 수 있습니다.'}`;
    }

    if (lowerMessage.includes('모델') || lowerMessage.includes('model')) {
      return `저는 ${selectedAgent?.config.model} 모델을 사용하고 있으며, temperature는 ${selectedAgent?.config.temperature || 0.7}로 설정되어 있습니다.`;
    }

    if (lowerMessage.includes('도움') || lowerMessage.includes('help')) {
      return `물론이죠! 저는 다음과 같은 작업을 도와드릴 수 있습니다:

1. 질문에 대한 답변 제공
2. 데이터 분석 지원
3. 코드 작성 및 리뷰
4. 문서 작성 지원

구체적으로 어떤 도움이 필요하신가요?`;
    }

    // Default response with some variation
    const defaultResponses = [
      `흥미로운 질문이네요! ${selectedAgent?.config.ragEnabled ? 'RAG 시스템을 활용하여 ' : ''}관련 정보를 검색하고 있습니다...`,
      `알겠습니다. "${userMessage}"에 대해 분석해보겠습니다.`,
      `좋은 질문입니다! 이 주제에 대해 더 자세히 설명드리겠습니다.`,
      `이해했습니다. 해당 요청을 처리하고 있습니다.`,
    ];

    const randomResponse =
      defaultResponses[Math.floor(Math.random() * defaultResponses.length)];

    return `${randomResponse}

${selectedAgent?.config.systemPrompt ? '시스템 설정에 따라 ' : ''}이 응답은 mock 데이터입니다. 실제 환경에서는 ${selectedAgent?.config.model} 모델이 실시간으로 응답을 생성합니다.

더 궁금한 점이 있으시면 언제든 질문해주세요!`;
  };

  /**
   * Handle send message
   */
  const handleSendMessage = async () => {
    if (!inputValue.trim() || !selectedAgentId || isLoading) return;

    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: inputValue.trim(),
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Simulate AI response delay
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: `msg-${Date.now()}-ai`,
        role: 'assistant',
        content: generateMockResponse(userMessage.content),
        timestamp: new Date().toISOString(),
        agentId: selectedAgentId,
      };

      setMessages((prev) => [...prev, aiResponse]);
      setIsLoading(false);

      // Focus back on textarea
      textareaRef.current?.focus();
    }, 1000 + Math.random() * 1000); // 1-2 seconds delay
  };

  /**
   * Handle clear chat
   */
  const handleClearChat = () => {
    if (messages.length > 0 && confirm('대화 내역을 모두 삭제하시겠습니까?')) {
      setMessages([]);
    }
  };

  /**
   * Handle key press (Enter to send)
   */
  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <div className="p-8 pb-4">
        <PageHeader
          title="Playground"
          description="에이전트를 선택하고 실시간으로 테스트해보세요"
          icon={<MessageSquare className="w-8 h-8 text-purple-400" />}
        />

        {/* Agent Selector */}
        <div className="mt-6 flex items-center gap-4">
          <label className="text-sm text-white/60 whitespace-nowrap">에이전트 선택:</label>
          <Select value={selectedAgentId} onValueChange={setSelectedAgentId}>
            <SelectTrigger className="w-full max-w-md bg-white/5 border-white/10 text-white">
              <SelectValue placeholder="에이전트를 선택하세요" />
            </SelectTrigger>
            <SelectContent className="bg-slate-900 border-white/10">
              {agents.length === 0 ? (
                <div className="p-4 text-center text-white/60">
                  에이전트가 없습니다
                </div>
              ) : (
                agents.map((agent) => {
                  const statusBadge =
                    agent.status === 'active' ? (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/20 text-green-400">활성</span>
                    ) : agent.status === 'inactive' ? (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-red-500/20 text-red-400">비활성</span>
                    ) : (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-500/20 text-yellow-400">보관됨</span>
                    );

                  return (
                    <SelectItem
                      key={agent.id}
                      value={agent.id}
                      className="text-white hover:bg-white/10 focus:bg-white/10 py-3 cursor-pointer"
                    >
                      <div className="flex items-center justify-between w-full gap-4">
                        <span className="font-medium">{agent.name}</span>
                        {statusBadge}
                      </div>
                    </SelectItem>
                  );
                })
              )}
            </SelectContent>
          </Select>

          {messages.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleClearChat}
              className="ml-auto border-red-500/20 text-red-400 hover:bg-red-500/10"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              대화 초기화
            </Button>
          )}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto px-8 pb-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="bg-purple-500/10 rounded-full p-8 mb-6">
              <MessageSquare className="w-16 h-16 text-purple-400/50" />
            </div>
            <h3 className="text-xl text-white/60 mb-2">대화를 시작하세요</h3>
            <p className="text-white/40 text-center max-w-md">
              {selectedAgent
                ? `${selectedAgent.name} 에이전트와 대화를 시작해보세요`
                : '먼저 에이전트를 선택해주세요'}
            </p>
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-4 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.role === 'assistant' && (
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                      <Bot className="w-4 h-4 text-purple-400" />
                    </div>
                  </div>
                )}

                <div
                  className={`
                    max-w-2xl rounded-2xl px-4 py-3 whitespace-pre-wrap
                    ${
                      message.role === 'user'
                        ? 'bg-purple-600 text-white'
                        : 'bg-white/5 text-white/90 border border-white/10'
                    }
                  `}
                >
                  {message.content}
                </div>

                {message.role === 'user' && (
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <User className="w-4 h-4 text-blue-400" />
                    </div>
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-4 justify-start">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-purple-400" />
                  </div>
                </div>
                <div className="max-w-2xl rounded-2xl px-4 py-3 bg-white/5 border border-white/10">
                  <Loader2 className="w-5 h-5 text-purple-400 animate-spin" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Input Area */}
      <div className="p-8 pt-4 border-t border-white/10 bg-black/20 backdrop-blur-xl">
        <div className="flex gap-3 items-end">
          <div className="flex-1">
            <Textarea
              ref={textareaRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder={
                selectedAgent
                  ? '메시지를 입력하세요... (Enter: 전송, Shift+Enter: 줄바꿈)'
                  : '에이전트를 먼저 선택해주세요'
              }
              disabled={!selectedAgent || isLoading}
              className="
                min-h-[80px] max-h-[200px] resize-none
                bg-white/5 border-white/10 text-white
                placeholder:text-white/40
                focus:border-purple-500/50 focus:ring-purple-500/20
              "
            />
          </div>
          <Button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || !selectedAgent || isLoading}
            className="
              h-[80px] px-6
              bg-purple-600 hover:bg-purple-700
              disabled:opacity-50 disabled:cursor-not-allowed
            "
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <Send className="w-5 h-5 mr-2" />
                전송
              </>
            )}
          </Button>
        </div>

        {/* Helper Text */}
        {selectedAgent && (
          <div className="mt-3 text-xs text-white/40 flex items-center justify-between">
            <span>
              현재 모델: {selectedAgent.config.model} | Temperature:{' '}
              {selectedAgent.config.temperature || 0.7}
              {selectedAgent.config.ragEnabled && ' | RAG 활성화'}
            </span>
            <span>Enter로 전송, Shift+Enter로 줄바꿈</span>
          </div>
        )}
      </div>
    </div>
  );
}
