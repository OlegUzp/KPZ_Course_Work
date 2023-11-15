import React, {Component, Fragment} from "react";
import Button from '@mui/material/Button';
import { deleteScream } from "../redux/actions/dataActions";
import { Dialog, DialogActions, DialogTitle, withStyles } from "@mui/material";
import { connect } from "react-redux";
const styles = {}
class DeleteScream extends Component {
    state = {
        open:false,
    }
    handleOpen=()=>{
        this.setState({open:true})
    }
    handleClose=()=>{
        this.setState({open:false})
    }
    deleteScream=()=>{
        this.props.deleteScream(this.props.screamId);
        this.setState({open:false})
    }
    render () {
        const {classes} = this.props;
        return (
            <Fragment>
                <Button variant="outlined" title="Delete Scream" onClick={this.handleOpen}>Delete</Button>
                <Dialog
                open={this.state.open}
                onClose={this.handleClose}
                fullWidth
                maxWidth="sm">
                    <DialogTitle>
                        Are you sure to delete this scream?
                    </DialogTitle>
                    <DialogActions>
                        <Button variant="outlined" onClick={this.handleClose}>
                            Cancel
                        </Button>
                        <Button variant="outlined" onClick={this.deleteScream}>
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        )
    }
}
export default connect(null,{deleteScream})(DeleteScream);