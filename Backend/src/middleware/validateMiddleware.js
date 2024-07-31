

const validate = (schema) => async (req,res,next)=>{
     
    try {
        const parseBody = await schema.parseAsync(req.body);
        req.body = parseBody;
        next();
    } catch (err) { 
        console.log(err)
       res.status(401).json({message:err.errors[0].message})
    }
};

export default validate;