import { json, redirect } from "@remix-run/node";
import {
    useActionData,
    useLoaderData,
    useNavigation,
    useSubmit,
    useNavigate,
  } from "@remix-run/react";
import { authenticate } from "../shopify.server";
import {
    IndexTable,
    Card,
    useIndexResourceState,
    Text,
    Badge,
} from '@shopify/polaris';
import React from 'react';
import { getUser, getUsers } from "../models/User.server";

export async function loader({ request, params }) {
    const { admin } = await authenticate.admin(request);

    return json(await getUsers());
  }

export default function SimpleIndexTableExample() {
    const users = useLoaderData();
    // const users = [
    //   {
    //     id: '1',
    //     username: 'surajp',
    //     firstName: 'Suraj',
    //     lastName: 'Prajapat',
    //     age: '30',
    //     email: 'suraj.nextbits@gmail.com',
    //     isOnline: <Badge tone="read-only" progress="incomplete">Online</Badge>,
    //     createdAt: 'Jul 20 at 3:46pm',
    //   },
    // ];
    
    const resourceName = {
      singular: 'user',
      plural: 'users',
    };
  
    const {selectedResources, allResourcesSelected, handleSelectionChange} =
      useIndexResourceState(users);
  
    const rowMarkup = users.map(
      (
        {id, username, firstName, lastName, age, email, isOnline, createdAt},
        index,
      ) => (
        <IndexTable.Row
          id={id}
          key={id}
          selected={selectedResources.includes(id)}
          position={index}
        >
          <IndexTable.Cell>
            <Text variant="bodyMd" fontWeight="bold" as="span">
              {username}
            </Text>
          </IndexTable.Cell>
          <IndexTable.Cell>{firstName}</IndexTable.Cell>
          <IndexTable.Cell>{lastName}</IndexTable.Cell>
          <IndexTable.Cell>
              {age}
          </IndexTable.Cell>
          <IndexTable.Cell>{email}</IndexTable.Cell>
          <IndexTable.Cell>{isOnline}</IndexTable.Cell>
          <IndexTable.Cell>{createdAt}</IndexTable.Cell>
        </IndexTable.Row>
      ),
    );
  
    return (
      <Card>
        <IndexTable
          resourceName={resourceName}
          itemCount={users.length}
          selectedItemsCount={
            allResourcesSelected ? 'All' : selectedResources.length
          }
          onSelectionChange={handleSelectionChange}
          headings={[
            {title: 'User Name'},
            {title: 'First Name'},
            {title: 'Last Name'},
            {title: 'Age'},
            {title: 'Email'},
            {title: 'Is Online'},
            {title: 'Created At'},
          ]}
        >
          {rowMarkup}
        </IndexTable>
      </Card>
    );
  }