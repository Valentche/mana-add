// Função auxiliar para gerar URLs
export const createPageUrl = (path) => {
    if (!path) return "/";
    return path.startsWith("/") ? path : `/${path}`;
};

// Se houver outras funções utilitárias no futuro, coloque aqui