-- employees
SELECT users.fullname, user_types.type, users.email FROM softengdb.users INNER JOIN softengdb.user_types ON user_types.utID = users.userType;

-- clients
SELECT clients.clientName, MAX(projects.dateAdded) AS lastRequestDate FROM softengdb.clients INNER JOIN softengdb.projects ON clients.clientID = projects.clientID GROUP BY projects.clientID;

-- list of items
SELECT inventory.materialID, material_types.type, materials.materialName,  unit_of_measures.unitOfMeasure, suppliers.supplierName, inventory.quantity, materials.price, materials.price * inventory.quantity AS total_price
FROM softengdb.inventory INNER JOIN softengdb.materials INNER JOIN softengdb.unit_of_measures INNER JOIN softengdb.suppliers INNER JOIN softengdb.material_types
ON inventory.materialID = materials.materialID AND materials.materialType = material_types.mtID AND materials.supplierID = suppliers.supplierID AND unit_of_measures.uomID = materials.unitOfMeasure;

-- list of projects
SELECT clients.clientName, projects.projectNumber, projects.dateAdded, projects.status
FROM softengdb.clients INNER JOIN softengdb.projects
ON clients.clientID = projects.clientID;

-- list of transactions
SELECT suppliers.supplierName, transactions.date, transactions.status
FROM softengdb.suppliers INNER JOIN softengdb.transactions 
ON suppliers.supplierID = transactions.supplierID;