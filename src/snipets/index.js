function Themes() {
    if (typeof window !== 'undefined') {
        if (document.getElementById("myList")!=null){
      var theme = document.getElementById("myList").value;
        }
      switch (theme) {
        case '1':
          barColor = '#bcc9d2'
          bodyColor = '#0e2431'
          break;
        case '2':
          barColor = '#9ba276'
          bodyColor = '#2f3543'
          break;
        case '3':
          barColor = '#f3b61f'
          bodyColor = '#90bede'
          break;
        case '4':
          barColor = '#f06469'
          bodyColor = '#ffd07b'
          break;
      }
    }
  }
export default Themes;