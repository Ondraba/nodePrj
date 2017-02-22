var update = document.getElementById('update')
var button = document.getElementById('button')

update.addEventListener('click', function () {
    console.log('ehm')
    fetch('quotes', {
    method: 'put',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ //content sended to server
      'name': 'Darth Vader',
      'quote': 'I find your lack of faith disturbing noob.'
    })
  }) //after request
  .then(res => {
    if (res.ok) return res.json()
  })
  .then(data => {
    console.log(data)
    window.location.reload(true)
  })
})


button.addEventListener('click', function () {
    console.log('ehm')
    fetch('quotes', {
    method: 'put',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ //content sended to server
      'name': 'Kenedias'
    })
  }) //after request
  .then(res => {
    if (res.ok) return res.json()
  })
  .then(data => {
    console.log(data)
    window.location.reload(true)
  })
})
