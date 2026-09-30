import { useState, useEffect, useCallback } from 'react';

export interface RouteState {
  path: string;
  params: Record<string, string>;
  searchParams: URLSearchParams;
}

function parseCurrentRoute(): RouteState {
  const path = window.location.pathname || '/';
  const searchParams = new URLSearchParams(window.location.search);
  const params: Record<string, string> = {};

  // Route pattern matching
  const propertyMatch = path.match(/^\/property\/([^/]+)/);
  if (propertyMatch) {
    params.slug = propertyMatch[1];
  }

  const projectMatch = path.match(/^\/project\/([^/]+)/);
  if (projectMatch) {
    params.slug = projectMatch[1];
  }

  const developerMatch = path.match(/^\/developer\/([^/]+)/);
  if (developerMatch) {
    params.slug = developerMatch[1];
  }

  const brokerMatch = path.match(/^\/broker\/([^/]+)/);
  if (brokerMatch) {
    params.slug = brokerMatch[1];
  }

  const serviceMatch = path.match(/^\/services\/([^/]+)/);
  if (serviceMatch) {
    params.slug = serviceMatch[1];
  }

  const cityMatch = path.match(/^\/properties\/([^/]+)/);
  if (cityMatch && !['new', 'search'].includes(cityMatch[1])) {
    params.city = decodeURIComponent(cityMatch[1]);
  }

  return { path, params, searchParams };
}

let routerListeners: Set<() => void> = new Set();

export function navigate(url: string, replace = false) {
  if (replace) {
    window.history.replaceState({}, '', url);
  } else {
    window.history.pushState({}, '', url);
  }
  // Scroll to top smoothly
  window.scrollTo({ top: 0, behavior: 'smooth' });
  routerListeners.forEach((cb) => cb());
}

export function useRouter() {
  const [route, setRoute] = useState<RouteState>(parseCurrentRoute);

  useEffect(() => {
    const handlePopState = () => {
      setRoute(parseCurrentRoute());
    };

    const handleCustomNav = () => {
      setRoute(parseCurrentRoute());
    };

    routerListeners.add(handleCustomNav);
    window.addEventListener('popstate', handlePopState);

    return () => {
      routerListeners.delete(handleCustomNav);
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const goTo = useCallback((url: string, replace = false) => {
    navigate(url, replace);
  }, []);

  return {
    ...route,
    navigate: goTo,
  };
}
