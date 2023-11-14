import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Switch,
  IconButton,
  TableFooter,
  TablePagination,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { styled } from "@mui/material/styles";

// Mock Data - Replace with actual API data
const mockData = require("./menu.json"); // Adjust the path to where your JSON is.

// Styled Components
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

// Helper component to render menu items as rows
const MenuItemRow = ({ item, onEdit, onDelete, onToggle }) => {
  const [isAvailable, setIsAvailable] = useState(
    item.menu_item_availability === "available"
  );

  const handleToggle = (event) => {
    setIsAvailable(event.target.checked);
    onToggle(item.menu_item_id, event.target.checked);
  };

  return (
    <TableRow>
      <TableCell>{item.menu_item_name}</TableCell>
      <TableCell>{item.menu_ingrediants}</TableCell>
      <TableCell>{item.menu_price}</TableCell>
      <TableCell>
        {item.menu_offer && item.menu_offer != "0" && (
          <Typography component="span" sx={{ color: "red" }}>
            {item.menu_offer} % off
          </Typography>
        )}
        {item.menu_offer && item.menu_offer == "0" && (
          <Typography component="span" sx={{ color: "grey" }}>
            N/A
          </Typography>
        )}
        {/* <TableCell>{item.menu_offer}</TableCell> */}
      </TableCell>
      <TableCell>
        <Switch checked={isAvailable} onChange={handleToggle} />
      </TableCell>
      <TableCell>
        <IconButton onClick={() => onEdit(item)}>
          <EditIcon />
        </IconButton>
        <IconButton onClick={() => onDelete(item.menu_item_id)}>
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

const RestaurantMenuPage = () => {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [currentEditItem, setCurrentEditItem] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);

  // Functions to handle modal open/close
  const handleEditOpen = (item) => {
    setCurrentEditItem(item);
    setOpenEditModal(true);
  };

  const handleEditClose = () => {
    setOpenEditModal(false);
    setCurrentEditItem(null);
  };

  const handleDeleteOpen = (itemId) => {
    setDeleteItemId(itemId);
    setOpenDeleteModal(true);
  };

  const handleDeleteClose = () => {
    setOpenDeleteModal(false);
  };

  // Dummy functions to simulate API interactions
  const editMenuItem = (itemData) => {
    console.log("Editing item", itemData);
    // Implement edit logic
  };

  const deleteMenuItem = (itemId) => {
    console.log("Deleting item", itemId);
    // Implement delete logic
  };

  const toggleMenuItemAvailability = (itemId, isAvailable) => {
    console.log("Toggling availability for item", itemId, isAvailable);
    // Implement availability toggle logic
  };

  // Rendering
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ width: "100%", marginBottom: 2 }}>
        <Grid
          container
          spacing={2}
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item xs={8}>
            <Typography variant="h4" gutterBottom>
              {mockData.restaurant_name} Menu
            </Typography>
            <Typography variant="subtitle1">
              {mockData.restaurant_location}
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => alert("Offers Clicked")}
            >
              Add Menu item
            </Button>
          </Grid>
          <Grid item xs={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => alert("Offers Clicked")}
            >
              Main Offer
            </Button>
          </Grid>
        </Grid>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Item Name</TableCell>
              <TableCell>Ingredients</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Offeres</TableCell>
              <TableCell>Available</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mockData.restaurant_food_menu.map((item) => (
              <MenuItemRow
                key={item.menu_item_id}
                item={item}
                onEdit={handleEditOpen}
                onDelete={handleDeleteOpen}
                onToggle={toggleMenuItemAvailability}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Menu Item Modal */}
      <Modal
        open={openEditModal}
        onClose={handleEditClose}
        aria-labelledby="edit-menu-item-modal"
        aria-describedby="edit-menu-item-modal-description"
      >
        {/* Modal content goes here. Replace with actual content */}
        <Box>
          {/* Form fields for editing menu item */}
          {/* Submit button should call editMenuItem function with the edited data */}
        </Box>
      </Modal>

      {/* Confirm Delete Modal */}
      <Modal
        open={openDeleteModal}
        onClose={handleDeleteClose}
        aria-labelledby="delete-confirm-modal"
        aria-describedby="delete-confirm-modal-description"
      >
        {/* Confirm deletion content */}
        <Box>
          {/* Yes/No buttons for confirmation */}
          {/* 'Yes' button should call deleteMenuItem function with deleteItemId */}
        </Box>
      </Modal>
    </Container>
  );
};

export default RestaurantMenuPage;
