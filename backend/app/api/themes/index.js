const { Router } = require('express')

const { Theme } = require('../../models')

const router = new Router()

router.get('/', (req, res) => {
  try {
    res.status(200).json(Theme.get())
  } catch (err) {
    res.status(500).json(err)
  }
})


router.get('/:themeId', (req, res) => {
  try {
    res.status(200).json(Theme.getById(req.params.themeId))
  } catch (err) {
    res.status(500).json(err)
  }
})

router.post('/', (req, res) => {
  try {
    let boolCheckName = true;
    Theme.get().forEach((theme) => {if (theme.name === req.body.name) {boolCheckName = false} })
    if(boolCheckName){
      const theme = Theme.create({ ...req.body })
      res.status(201).json(theme)
    }
    res.status(400).json("theme are already in base")
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json(err.extra)
    } else {
      res.status(500).json(err)
    }
  }
})

router.delete('/:themeId', (req, res) => {
  try {
    res.status(200).json(Theme.delete(req.params.themeId))
    console.log(req.params.themeId)
  } catch (err) {
    res.status(500).json(err)
  }
})

router.put('/:themeId', (req, res) => {
  try {
    res.status(200).json(Theme.update(req.params.themeId, req.body))
    console.log(req.body)
  } catch (err) {
    res.status(500).json(err)
  }
})


module.exports = router
