// styles/liveDetection.ts
import { StyleSheet } from 'react-native';
import colors from './colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightBlue,
  },
  cameraContainer: {
    width: '100%',
    height: '75%',
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    borderWidth: 2,
    borderColor: '#ddd',
    position: 'relative',
  },
  // camera: {
  //   width: '100%',
  //   height: '100%',
  //   transform: [
  //     { scaleX: -1 }
  //   ]
  // },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    opacity: 0.7,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 0,
  },
  buttonContainer: {
    width: '100%',
    padding: 20,
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
  }
});

export default styles;