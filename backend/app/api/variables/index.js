const { Router } = require('express')

const { Variable } = require('../../models')

const router = new Router()

router.get('/', (req, res) => {
  try {
    if(Variable.get().length > 0){
        res.status(200).json(Variable.get()[0])
    }
    else{
        const variable = Variable.create({userSelected:"0000000000000"})
        res.status(200).json(variable)
    }
  } catch (err) {
    res.status(500).json(err)
  }
})


router.post('/', (req, res) => {
  try {
    if(Variable.get().length > 0){
        const variable = Variable.update(Variable.get()[0].id,{ ...req.body })
        res.status(200).json(Variable.get()[0])
        res.status(201).json(variable)
    }
    else{
        const variable = Variable.create(...req.body)
        res.status(200).json(variable)
    }
    
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json(err.extra)
    } else {
      res.status(500).json(err)
    }
  }
})


module.exports = router
