# 📝 Gerenciador de Tarefas e Foco

## 📖 Descrição do Projeto
Um aplicativo completo e intuitivo para gerenciamento de tarefas diárias e produtividade. Projetado para oferecer uma experiência fluida, o app permite criar, editar, excluir e acompanhar o progresso de atividades, além de contar com um painel de estatísticas visuais dinâmico e recursos de segurança e personalização.

## ✨ Funcionalidades Implementadas
*   **Autenticação Local Rigorosa:** Sistema de login e cadastro seguros com validação de dados.
*   **Gerenciamento de Tarefas (CRUD):** Adicionar, visualizar, editar e concluir tarefas com sistema de urgência, paleta de cores customizável, tags e checklists integrados.
*   **Dashboard Dinâmico:** Gráfico em tempo real (PieChart) mostrando a produtividade e um carrossel de atalhos para tarefas marcadas como urgente.
*   **Gamificação:** Seção de perfil com contador de conquistas atualizado em tempo real.
*   **Persistência de Dados (Offline-First):** Uso de Zustand + AsyncStorage para armazenar o perfil e as tarefas de forma permanente na memória do dispositivo.

## 💻 Tecnologias Utilizadas
*   **React Native / Expo** (Framework principal)
*   **Zustand** (Gerenciamento de Estado Global)
*   **AsyncStorage** (Banco de Dados Local)
*   **React Navigation** (Arquitetura de rotas multi-stack e bottom tabs)
*   **React Native Chart Kit** (Gráficos Visuais)
*   **Expo Font** (Customização tipográfica)

## 📱 Sensores e Recursos Nativos Implementados
*   **Acesso à Câmera (`expo-image-picker`):** Solicitação de permissão nativa e acesso à lente do aparelho para anexar fotos e evidências visuais às tarefas.
*   **Motor de Notificações (`expo-notifications`):** Controle de permissão de sistema para acionamento de avisos, banners nativos e temporizadores.

## 🚀 Como Instalar

Certifique-se de ter o Node.js instalado. Clone o repositório e instale as dependências executando o comando abaixo no terminal da raiz do projeto:

```bash
npm install