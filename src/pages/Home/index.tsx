import { useHome } from '../../hooks/useHome';
import { MobileView } from '../Views/mobileView';
import { WebView } from '../Views/webView';

export function Home() {
  const {
    controlsRef,
    mobileWheelRef,
    isMobile,
    powerStatus,
    isDeviceActive,
    colorPreset,
    placedStickers,
    pendingDrop,
    currentScreen,
    selectedIndex,
    setSelectedIndex,
    activeProjectIndex,
    currentTrack,
    isPlaying,
    elapsedSeconds,
    volume,
    showVolumeHud,
    statusFeedback,
    handleSelectColor,
    handlePlaceSticker,
    handleDropSticker,
    handleConsumeDrop,
    handleTurnOnOnly,
    handleTogglePower,
    handleVolumeUp,
    handleVolumeDown,
    navigateToScreen,
    handleOpenProjectDetail,
    executeProjectAction,
    handleNext,
    handlePrev,
    handleSelect,
    handleMenuBack,
    handlePlayPause,
    handleMobileWheelPointerDown,
    handleMobileWheelPointerMove,
    handleMobileWheelPointerUp,
  } = useHome();

  if (isMobile) {
    return (
      <MobileView
        mobileWheelRef={mobileWheelRef}
        powerStatus={powerStatus}
        isDeviceActive={isDeviceActive}
        colorPreset={colorPreset}
        placedStickers={placedStickers}
        currentScreen={currentScreen}
        selectedIndex={selectedIndex}
        activeProjectIndex={activeProjectIndex}
        currentTrack={currentTrack}
        isPlaying={isPlaying}
        elapsedSeconds={elapsedSeconds}
        volume={volume}
        showVolumeHud={showVolumeHud}
        statusFeedback={statusFeedback}
        onTurnOnOnly={handleTurnOnOnly}
        onPrev={handlePrev}
        onNext={handleNext}
        onSelect={handleSelect}
        onMenuBack={handleMenuBack}
        onPlayPause={handlePlayPause}
        onHoverIndex={setSelectedIndex}
        onNavigateScreen={navigateToScreen}
        onOpenProjectDetail={handleOpenProjectDetail}
        onExecuteProjectAction={executeProjectAction}
        onWheelPointerDown={handleMobileWheelPointerDown}
        onWheelPointerMove={handleMobileWheelPointerMove}
        onWheelPointerUp={handleMobileWheelPointerUp}
      />
    );
  }

  return (
    <WebView
      controlsRef={controlsRef}
      isDeviceActive={isDeviceActive}
      powerStatus={powerStatus}
      colorPreset={colorPreset}
      placedStickers={placedStickers}
      pendingDrop={pendingDrop}
      currentScreen={currentScreen}
      selectedIndex={selectedIndex}
      activeProjectIndex={activeProjectIndex}
      currentTrack={currentTrack}
      isPlaying={isPlaying}
      elapsedSeconds={elapsedSeconds}
      volume={volume}
      showVolumeHud={showVolumeHud}
      statusFeedback={statusFeedback}
      onSelectColor={handleSelectColor}
      onDropSticker={handleDropSticker}
      onPlaceSticker={handlePlaceSticker}
      onConsumeDrop={handleConsumeDrop}
      onTogglePower={handleTogglePower}
      onVolumeUp={handleVolumeUp}
      onVolumeDown={handleVolumeDown}
      onNext={handleNext}
      onPrev={handlePrev}
      onSelect={handleSelect}
      onMenuBack={handleMenuBack}
      onPlayPause={handlePlayPause}
      onHoverIndex={setSelectedIndex}
      onNavigateScreen={navigateToScreen}
      onOpenProjectDetail={handleOpenProjectDetail}
      onExecuteProjectAction={executeProjectAction}
    />
  );
}