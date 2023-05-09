import useStore from '../../store/useStore'
import { SettingsRow } from './SettingsComponents'

const BetaFeatures = () => {
  const setFeatures = useStore((state) => state.setFeatures)
  const showFeatures = useStore((state) => state.showFeatures)
  const features = useStore((state) => state.features)

  return (
    <>
      {showFeatures.integrations && (
        <SettingsRow
          title="Integrations"
          checked={features.integrations}
          onChange={() => setFeatures('integrations', !features.integrations)}
        />
      )}
      {features.integrations && (
        <SettingsRow
          title="Spotify Pro"
          checked={features.spotifypro}
          onChange={() => setFeatures('spotifypro', !features.spotifypro)}
        />
      )}
      <SettingsRow
        title="Scene external call"
        checked={features.sceneexternal}
        onChange={() => setFeatures('sceneexternal', !features.sceneexternal)}
      />
    </>
  )
}

export default BetaFeatures
