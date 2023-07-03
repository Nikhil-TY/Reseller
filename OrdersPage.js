import React, { useState } from "react";
import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { Picker } from '@react-native-picker/picker';

const ordersData = [
  {
    id: 1,
    creationDate: "2023-06-01",
    ecomOrderNo: "ECOM123",
    poNumber: "PO456",
    sapOrderNo: "SAP789",
    netValue: "$100",
    status: "Pending",
    shipToParty: "ABC Company",
    buyer: "John Doe",
    noOfLinesDelivered: 2,
    materialNumber: "M123",
    brand: "Brand X",
    quantity: 10,
    unitValue: "$10",
    deliveredQty: 5,
    balanceQty: 5,
    lineStatus: "Delivered",
    customerCode: "C001" // Add customer code
  },
  {
    id: 2,
    creationDate: "2023-06-02",
    ecomOrderNo: "ECOM456",
    poNumber: "PO789",
    sapOrderNo: "SAP123",
    netValue: "$200",
    status: "Processing",
    shipToParty: "XYZ Company",
    buyer: "Jane Smith",
    noOfLinesDelivered: 3,
    materialNumber: "M456",
    brand: "Brand Y",
    quantity: 20,
    unitValue: "$8",
    deliveredQty: 12,
    balanceQty: 8,
    lineStatus: "Processing",
    customerCode: "C002" // Add customer code
  },
  // Add more mock data as needed
];

const OrdersPage = () => {
  const [selectedShipToParty, setSelectedShipToParty] = useState(null);
  const [expandedCardId, setExpandedCardId] = useState(null);

  const shipToParties = Array.from(
    new Set(ordersData.map((order) => order.shipToParty))
  );

  const toggleCardExpansion = (cardId) => {
    setExpandedCardId((expandedCardId) =>
      expandedCardId === cardId ? null : cardId
    );
  };

  return (
    <ScrollView>
      <DropdownContainer>
        <DropdownLabel>Customers:</DropdownLabel>
        <DropdownSelect
          selectedValue={selectedShipToParty}
          onValueChange={(value) => setSelectedShipToParty(value)}
          style={{ color: "black" ,
          paddingRight: 20, 
        }}
        dropdownIconColor="black"
        >
          <DropdownOption label="All" value={null} />
          {shipToParties.map((party) => (
            <DropdownOption key={party} label={party} value={party} />
          ))}
        </DropdownSelect>
      </DropdownContainer>
      <ScrollContainer>
        {ordersData
          .filter(
            (order) =>
              selectedShipToParty === null ||
              selectedShipToParty === "All" ||
              order.shipToParty === selectedShipToParty
          )
          .map((order) => (
            <CardContainer
              key={order.id}
              onPress={() => toggleCardExpansion(order.id)}
              activeOpacity={0.8}
              expanded={expandedCardId === order.id}
            >
              <CardContent>
                <CardLabel>EcomOrderNo:</CardLabel>
                <OrderNoText>{order.ecomOrderNo}</OrderNoText>
              </CardContent>

              <CardContent>
                <CardLabel>Creation Date:</CardLabel>
                <CreationDateText>{order.creationDate}</CreationDateText>
              </CardContent>

              <CardContent>
                <CardLabel>Net Value:</CardLabel>
                <NetValueText>{order.netValue}</NetValueText>
              </CardContent>

              <CardContent>
                <CardLabel>Order Status:</CardLabel>
                <StatusText>{order.status}</StatusText>
              </CardContent>

              {expandedCardId === order.id && (
                <DetailsContainer>
                  <DetailLabel>Ship To Party:</DetailLabel>
                  <DetailValue>{order.shipToParty}</DetailValue>

                  <DetailLabel>Buyer:</DetailLabel>
                  <DetailValue>{order.buyer}</DetailValue>

                  <DetailLabel>No. of Lines Delivered:</DetailLabel>
                  <DetailValue>{order.noOfLinesDelivered}</DetailValue>

                  <DetailLabel>Material Number:</DetailLabel>
                  <DetailValue>{order.materialNumber}</DetailValue>

                  <DetailLabel>Brand:</DetailLabel>
                  <DetailValue>{order.brand}</DetailValue>

                  <DetailLabel>Quantity:</DetailLabel>
                  <DetailValue>{order.quantity}</DetailValue>

                  <DetailLabel>Unit Value:</DetailLabel>
                  <DetailValue>{order.unitValue}</DetailValue>

                  <DetailLabel>Delivered Qty:</DetailLabel>
                  <DetailValue>{order.deliveredQty}</DetailValue>

                  <DetailLabel>Balance Qty:</DetailLabel>
                  <DetailValue>{order.balanceQty}</DetailValue>

                  <DetailLabel>Line Status:</DetailLabel>
                  <DetailValue>{order.lineStatus}</DetailValue>
                </DetailsContainer>
              )}
            </CardContainer>
          ))}
      </ScrollContainer>
    </ScrollView>
  );
};

const ScrollContainer = styled(View)`
  padding: 16px;
`;

const CardContainer = styled(TouchableOpacity)`
  background-color: #ffffff;
  padding: 16px;
  margin-bottom: 16px;
  border-radius: 8px;
  elevation: 2;
  ${(props) =>
    props.expanded &&
    `
    border: 2px solid blue;
  `}
`;

const CardContent = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 8px;
`;

const CardLabel = styled(Text)`
  flex: 1;
  font-size: 12px;
  font-weight: bold;
  color: #808080;
  text-transform: uppercase;
  margin-bottom: 8px;
`;

const OrderNoText = styled(Text)`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
  color: #000000;
`;

const CreationDateText = styled(Text)`
  font-size: 14px;
  margin-bottom: 4px;
  color: #000000;
`;

const NetValueText = styled(Text)`
  font-size: 14px;
  margin-bottom: 4px;
  color: #000000;
`;

const StatusText = styled(Text)`
  font-size: 14px;
  color: blue;
  font-weight: bold;
`;

const DetailsContainer = styled(View)`
  margin-top: 16px;
  justify-content: flex-start;
  margin-bottom: 8px;
`;

const DetailLabel = styled(Text)`
  font-size: 12px;
  font-weight: bold;
  color: #808080;
  text-transform: uppercase;
  margin-bottom: 8px;
`;

const DetailValue = styled(Text)`
  font-size: 15px;
  margin-bottom: 8px;
  color: #000000;
`;

const DropdownContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  margin: 16px;
  background-color: #ffffff;
`;

const DropdownLabel = styled(Text)`
  font-size: 16px;
  font-weight: bold;
  margin-left: 8px;
  color: black;
`;

const DropdownSelect = styled(Picker)`
  flex: 1;
`;

const DropdownOption = styled(Picker.Item)``;

export default OrdersPage;