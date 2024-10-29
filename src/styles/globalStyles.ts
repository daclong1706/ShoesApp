import {StyleSheet} from 'react-native';
import {appColors} from '../constants/appColor';
import {fontFamilies} from '../constants/fontFamilies';

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors.white,
  },

  text: {
    fontFamily: fontFamilies.regular,
    fontSize: 14,
    color: appColors.text,
  },

  button: {
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: appColors.white,
    paddingHorizontal: 16,
    paddingVertical: 16,
    minHeight: 54,
    flexDirection: 'row',
  },

  shadow: {
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 2,
  },

  section: {
    paddingHorizontal: 16,
    paddingVertical: 6,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: appColors.primarySoft,
    width: 30,
    height: 30,
    borderRadius: 100,
  },

  card: {
    borderRadius: 12,
    backgroundColor: appColors.white,
    padding: 12,
    marginHorizontal: 4,
    marginVertical: 6,
    marginBottom: 16,
  },
});
