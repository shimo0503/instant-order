"use client";
import type { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { Inter } from "next/font/google";
import "./globals.css";
import {
  Box,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import SidebarData from "@/components/SidebarData";
import Link from "next/link";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PaymentOutlinedIcon from '@mui/icons-material/PaymentOutlined';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import LocalDiningOutlinedIcon from '@mui/icons-material/LocalDiningOutlined';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import FormatAlignJustifyOutlinedIcon from '@mui/icons-material/FormatAlignJustifyOutlined';
import { useState, useEffect } from "react";
import RootProvider from "./context/RootProvider";

const inter = Inter({ subsets: ["latin"] });

const metadata: Metadata = {
  title: "instant order",
  description: "注文や会計を行えます。",
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
        <meta name="description" content={metadata.description as string} />
      </head>
      <body className={inter.className}>
        <AppRouterCacheProvider>
          <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
              >
                <Toolbar>
                  <Typography variant="h6" noWrap component="div">
                    <Link href='/'>instant order</Link>
                  </Typography>
                </Toolbar>
              </AppBar>
            {!isMobile && (
              <Drawer
                variant="permanent"
                sx={{
                  width: drawerWidth,
                  flexShrink: 0,
                  [`& .MuiDrawer-paper`]: {
                    width: drawerWidth,
                    boxSizing: "border-box",
                  },
                }}
              >
                <Toolbar />
                <Box sx={{ overflow: "auto" }}>
                  {SidebarData.map(
                    (item, index) => (
                      <Link href={item.link} key={index}>
                        <List key={index}>
                          <ListItem key={index}>
                            <ListItemButton key={index}>
                              <ListItemIcon>
                                {
                                  item.icon === "home" ? <HomeOutlinedIcon/> :
                                  item.icon === "meal" ? <LocalDiningOutlinedIcon/> :
                                  item.icon === "prod" ? <LocalMallOutlinedIcon/> :
                                  item.icon === "sale" ? <AttachMoneyOutlinedIcon/> :
                                  item.icon === "pay" ? <PaymentOutlinedIcon/> :
                                  <FormatAlignJustifyOutlinedIcon/>
                                }
                              </ListItemIcon>
                              <ListItemText primary={item.title} />
                            </ListItemButton>
                          </ListItem>
                        </List>
                      </Link>
                    )
                  )}
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