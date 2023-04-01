
/*PASO 1 */
/*Crear categoria de usuarios (usercategories)  1 Admin 2 General (roles de usuario)*/

INSERT INTO terra.usercategories
(`type`)
VALUES('General');
/*id Admin = 3 */
/*id General = 4 */

SELECT * FROM usercategories u;


/*PASO 2 */
/*Crear usuarios (users)  revisar el id anterior  (roles de usuario)*/

INSERT INTO terra.users
(name, surname, email, password, phone, user_categories_id)
VALUES('Rocio', 'Alvarez', 'ro@general.com', '10', '10', 4); /*Realizar esto para cada usuario de la foto */

/*id users con rol de Admin  = Alejandro 2, Denise 3, Maira 4, Valentino 5*/



SELECT * FROM users u;

/*PASO 3 */
/*Crear products categories */

INSERT INTO terra.productscategories
(`type`)
VALUES('Exterior');

SELECT * FROM productscategories p;
/* id categorias de producto interior 1, Exterior 2, Independiente 3*/

/*PASO 4 */
/*Crear products  */

INSERT INTO terra.products
(name, price, description, stock, products_categories_id)
VALUES('Cerezo', 95, 'Florece', 25, 3);



SELECT * FROM products;
/* id categorias de producto interio 1, Exterior 2, Independiente 3*/



