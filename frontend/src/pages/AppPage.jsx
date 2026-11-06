import React from 'react';
import { AppProvider } from '../context/AppContext';
import ServerRail from '../components/app/ServerRail';
import ChannelSidebar from '../components/app/ChannelSidebar';
import ChatArea from '../components/app/ChatArea';
import MemberPanel from '../components/app/MemberPanel';
import CreateServerModal from '../components/app/CreateServerModal';
import CreateChannelModal from '../components/app/CreateChannelModal';
import UserSettingsModal from '../components/app/UserSettingsModal';

export default function AppPage() {
  return (
    <AppProvider>
      <div className="flex h-screen w-screen overflow-hidden bg-[#313338] select-none font-sans relative">
        {/* Column 1: Server Rail (72px) */}
        <ServerRail />

        {/* Column 2: Channel Sidebar (240px) */}
        <ChannelSidebar />

        {/* Column 3: Chat Area (flex-1) */}
        <ChatArea />

        {/* Column 4: Member Panel (240px, toggleable) */}
        <MemberPanel />

        {/* Interactive Modals */}
        <CreateServerModal />
        <CreateChannelModal />
        <UserSettingsModal />
      </div>
    </AppProvider>
  );
}
