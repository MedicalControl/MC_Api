import swaggerJSDoc from "swagger-jsdoc";
import path from "path";

const options : swaggerJSDoc.Options = {
    definition: {
        openapi: "3.0.0", 
        info: {
            title: 'Medical Control Api Documentation', 
            version: '1.0.0', 
            description: "Medical control is a system created to "
        }, 
    }, 
    apis:[`${path.join(__dirname, '../routes/*')}`]
}

const swaggerSpec = swaggerJSDoc(options)

export default swaggerSpec