module.exports = {
  simpleMediaQueries: {
    'initialize': '1px',
    'xxsmall': '20em',
    'xsmall': '30em',
    'small': '35.5em', // >= 568px @ 16px 
    'medium': '48em', // >= 768px @ 16px 
    'large': '64em', // >= 1024px @ 16px 
    'xlarge': '80em' // >= 1280px @ 16px
  },
  
  map: {
    maps: [{
      headerSizes: {
        mobile: {
          h1: 32,
          h2: 26,
          h3: 24,
          h4: 22,
          h5: 20,
          h6: 16
        },
        regular: {
          'h1': 48,
          'h2': 40,
          'h3': 31,
          'h4': 25,
          'h5': 20,
          'h6': 16
        }
      }
    }]
  }
}