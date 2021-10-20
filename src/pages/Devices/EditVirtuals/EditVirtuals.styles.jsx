import { makeStyles } from '@material-ui/core/styles';

export const useEditVirtualsStyles = makeStyles(theme => ({
    appBar: {
      position: 'relative',
      marginBottom: '1rem',
      background: theme.palette.background.default,
      color: theme.palette.text.primary,
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },
    dialog: {
      background: theme.palette.background.default,
    },
    segmentTitle: {
      display: 'flex',
      borderBottom: '1px dashed #aaa',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0.5rem 0',
      margin: '0 1rem',
    },
    segmentButtonWrapper: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0.5rem 0',
      margin: '0 1rem',
    },
    cloudEffectCard: {
      cursor: 'pointer',
      '&:hover': {
        borderColor: theme.palette.primary.main
      }
    }
  }));