// @ts-nocheck
import React from 'react';
import { ApplyPluginsType, dynamic } from 'E:/hfx学习树/前端/练习/reactLearn/umilearn/node_modules/@umijs/runtime';
import * as umiExports from './umiExports';
import { plugin } from './plugin';

export function getRoutes() {
  const routes = [
  {
    "path": "/",
    "component": dynamic({ loader: () => import(/* webpackChunkName: '.umi__plugin-layout__Layout' */'E:/hfx学习树/前端/练习/reactLearn/umilearn/src/.umi/plugin-layout/Layout.tsx')}),
    "routes": [
      {
        "path": "/",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'layouts__index' */'@/layouts/index.jsx')}),
        "routes": [
          {
            "path": "/counter",
            "exact": true,
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__counter' */'@/pages/counter.jsx')})
          },
          {
            "path": "/",
            "exact": true,
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__index' */'@/pages/index.jsx')})
          },
          {
            "path": "/login",
            "exact": true,
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__login' */'@/pages/login.jsx')})
          },
          {
            "path": "/welcome",
            "exact": true,
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__welcome' */'@/pages/welcome.jsx')})
          }
        ]
      }
    ]
  }
];

  // allow user to extend routes
  plugin.applyPlugins({
    key: 'patchRoutes',
    type: ApplyPluginsType.event,
    args: { routes },
  });

  return routes;
}
