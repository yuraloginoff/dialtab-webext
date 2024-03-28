"use strict";

export const Defaults = {
  settings: {
    darktheme: true,
  },

  groups: [
    {
      _id: 0,
      title: "Default list",
      open: "open",
      links: [
        {
          id: 0,
          groupId: 0,
          url: "https://duckduckgo.com",
          title: "DuckDuckGo",
          favicon: "https://icons.duckduckgo.com/ip3/duckduckgo.com.ico",
        },
        {
          id: 1,
          groupId: 0,
          url: "https://www.privacytools.io/",
          title: "PrivacyTools.io",
          favicon: "https://icons.duckduckgo.com/ip3/privacytools.io.ico",
        },
      ],
    },
  ],
};
