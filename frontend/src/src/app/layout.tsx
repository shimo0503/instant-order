'use client';

import './globals.css';

import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import FormatAlignJustifyOutlinedIcon from '@mui/icons-material/FormatAlignJustifyOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import LocalDiningOutlinedIcon from '@mui/icons-material/LocalDiningOutlined';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import PaymentOutlinedIcon from '@mui/icons-material/PaymentOutlined';
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import SidebarData from '@/components/SidebarData';

import RootProvider from './context/RootProvider';

const inter = Inter({ subsets: ['latin'] });

const metadata: Metadata = {
  description: '注文や会計を行えます。',
  title: 'instant order',
};
const drawerWidth = 240;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isMobile, setIsMobile] = useState(false);

  // レスポンシブデザインに基づいて画面幅を検出
  const checkIfMobile = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  useEffect(() => {
    // 初期の画面幅に基づいて状態を設定
    checkIfMobile();

    // 画面サイズが変更されたときに再チェック
    window.addEventListener('resize', checkIfMobile);

    // コンポーネントがアンマウントされる時にイベントリスナーを削除
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);
  return (
    <html lang="en">
      <head>
        <title>{metadata.title as string}</title>
        <meta content={metadata.description as string} name="description" />
      </head>
      <body className={inter.className}>
        <AppRouterCacheProvider>
          <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
              position="fixed"
              sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
            >
              <Toolbar>
                <Typography component="div" noWrap variant="h6">
                  <Link href="/">instant order</Link>
                </Typography>
              </Toolbar>
            </AppBar>
            {!isMobile && (
              <Drawer
                sx={{
                  [`& .MuiDrawer-paper`]: {
                    boxSizing: 'border-box',
                    width: drawerWidth,
                  },
                  flexShrink: 0,
                  width: drawerWidth,
                }}
                variant="permanent"
              >
                <Toolbar />
                <Box sx={{ overflow: 'auto' }}>
                  {SidebarData.map((item, index) => (
                    <Link href={item.link} key={index}>
                      <List key={index}>
                        <ListItem key={index}>
                          <ListItemButton key={index}>
                            <ListItemIcon>
                              {item.icon === 'home' ? (
                                <HomeOutlinedIcon />
                              ) : item.icon === 'meal' ? (
                                <LocalDiningOutlinedIcon />
                              ) : item.icon === 'prod' ? (
                                <LocalMallOutlinedIcon />
                              ) : item.icon === 'sale' ? (
                                <AttachMoneyOutlinedIcon />
                              ) : item.icon === 'pay' ? (
                                <PaymentOutlinedIcon />
                              ) : (
                                <FormatAlignJustifyOutlinedIcon />
                              )}
                            </ListItemIcon>
                            <ListItemText primary={item.title} />
                          </ListItemButton>
                        </ListItem>
                      </List>
                    </Link>
                  ))}
                </Box>
              </Drawer>
            )}
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
              <Toolbar />
              <RootProvider>{children}</RootProvider>
            </Box>
          </Box>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
