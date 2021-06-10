import React, { Component } from "react";
import Nav from "./nav";
import Banner from "./banner";
import axios from "axios";
import Cookies from "universal-cookie";
import { Prompt } from "react-router";

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profile: {},
            isProfileChecked: false,
            isUpdateUnsaved: false,
            isProfileUpdateSuccess: false,
            firstNameDisabled: true,
            lastNameDisabled: true,
            phoneNumberDisabled: true,
            fileUploadError: false,
            imageFile: {}
        };

        const sanctumTokenCookie = new Cookies();
        const sanctumToken = sanctumTokenCookie.get("sanctum_token");
        axios.defaults.headers.common = {
            Authorization: "Bearer " + sanctumToken
        };

        const cancelToken = axios.CancelToken;
        this.source = cancelToken.source();
        this.configAxios = { cancelToken: this.source.token };

        this.enableEdit = this.enableEdit.bind(this);
        this.setFirstName = this.setFirstName.bind(this);
        this.setLastName = this.setLastName.bind(this);
        this.setPhoneNumber = this.setPhoneNumber.bind(this);
        this.handleImageUpload = this.handleImageUpload.bind(this);
        this.setFileImage = this.setFileImage.bind(this);
        this.updateProfile = this.updateProfile.bind(this);

        this.imgPreviewURL = null;
    }

    componentDidMount() {
        this.getProfile();
    }

    componentWillUnmount() {
        this.source.cancel("Profile component unmounted");
        if (this.imgPreviewURL != null) {
            URL.revokeObjectURL(this.imgPreviewURL);
        }
    }

    getProfile() {
        axios
            .get(
                "http://localhost:8000/api/profile/myprofile",
                this.configAxios
            )
            .then(response => {
                console.log(response);
                this.setState({
                    profile: response.data,
                    isProfileChecked: true
                });
            })
            .catch(error => {
                if (axios.isCancel(error)) {
                    console.log("Profile Unmounted");
                } else {
                    this.setState({ isProfileChecked: true });
                }
            });
    }

    enableEdit(e) {
        e.preventDefault();

        switch (e.target.title) {
            case "firstNameDisabled":
                this.setState({ firstNameDisabled: false });
                break;
            case "lastNameDisabled":
                this.setState({ lastNameDisabled: false });
                break;
            case "phoneNumberDisabled":
                this.setState({ phoneNumberDisabled: false });
                break;
            default:
                break;
        }
    }

    setFirstName(e) {
        const profileCopy = { ...this.state.profile };
        profileCopy.first_name = e.target.value;
        this.setState({ profile: profileCopy, isUpdateUnsaved: true });
    }

    setLastName(e) {
        const profileCopy = { ...this.state.profile };
        profileCopy.last_name = e.target.value;
        this.setState({ profile: profileCopy, isUpdateUnsaved: true });
    }

    setPhoneNumber(e) {
        const profileCopy = { ...this.state.profile };
        profileCopy.phone_number = e.target.value;
        this.setState({ profile: profileCopy, isUpdateUnsaved: true });
    }

    handleImageUpload(e) {
        const imageFile = e.target.files[0];
        const [fileType] = imageFile.type.split("/");

        if (fileType === "image") {
            this.setFileImage(imageFile);
            this.setState({ fileUploadError: false });
        } else {
            this.setState({ fileUploadError: true });
        }
    }

    setFileImage(file) {
        const profileCopy = { ...this.state.profile };
        this.imgPreviewURL = URL.createObjectURL(file);
        profileCopy.profile_image = this.imgPreviewURL;
        this.setState({
            profile: profileCopy,
            imageFile: file,
            isUpdateUnsaved: true
        });
    }

    updateProfile(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append("first_name", this.state.profile.first_name);
        formData.append("last_name", this.state.profile.last_name);
        formData.append("phone_number", this.state.profile.phone_number);
        formData.append("profile_image", this.state.imageFile);

        axios
            .post(
                "http://localhost:8000/api/profile/update",
                formData,
                this.configAxios
            )
            .then(result => {
                console.log(result);
                this.setState({ isProfileUpdateSuccess: true, isUpdateUnsaved:false });
            })
            .catch(error => {
                console.log(error);
            });
    }
    render() {
        const imageURLPrefix = _.isEqual(this.state.imageFile, {})
            ? "http://localhost:8000/"
            : "";

        return (
            <React.Fragment>
                <Nav hasNotification={true} count={9} />
                <Banner text="Profile" />
                <Prompt
                    when={this.state.isUpdateUnsaved}
                    message="You have unsaved changes on your profile. Are you sure you want to leave?"
                />
                <div className="container">
                    <button className="btn btn-outline-danger my-3">
                        <span className="fa fa-plus-square"></span>
                        &nbsp;Logout
                    </button>
                    <div className="container rounded shadow-lg bg-white p-3 text-center mb-3">
                        {this.state.isProfileChecked ? (
                            !_.isEmpty(this.state.profile) ? (
                                <form className="">
                                    <div className="form-group">
                                        <div className=" d-flex justify-content-center">
                                            <div className="img-circle-wrapper-profile">
                                                <img
                                                    src={
                                                        imageURLPrefix +
                                                        this.state.profile
                                                            .profile_image
                                                    }
                                                    className="img-circle"
                                                    alt="profile image"
                                                />
                                            </div>
                                        </div>
                                        <input
                                            type="file"
                                            className="form-control-file"
                                            id="photo-upload"
                                            onChange={this.handleImageUpload}
                                            hidden
                                        />
                                        {this.state.fileUploadError ? (
                                            <span className=" font-weight-bold text-danger d-block">
                                                Upload an image
                                            </span>
                                        ) : (
                                            ""
                                        )}
                                        <label
                                            className="btn btn-outline-success mt-1"
                                            htmlFor="photo-upload"
                                        >
                                            <i className="fa fa-edit"></i> Edit
                                        </label>
                                    </div>

                                    <div className="w-75 mx-auto">
                                        <ul className="list-group list-group-flush">
                                            <div className="form-group ">
                                                <li className="list-group-item border-left-0 border-right-0">
                                                    <div className="row">
                                                        <div className="col-sm-8 col-md-8">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                disabled={
                                                                    this.state
                                                                        .firstNameDisabled
                                                                }
                                                                value={
                                                                    this.state
                                                                        .profile
                                                                        .first_name
                                                                }
                                                                onChange={
                                                                    this
                                                                        .setFirstName
                                                                }
                                                            />
                                                        </div>
                                                        <div className="col-sm-4 col-md-4">
                                                            <button
                                                                title="firstNameDisabled"
                                                                className="btn btn-default"
                                                                onClick={
                                                                    this
                                                                        .enableEdit
                                                                }
                                                            >
                                                                <span
                                                                    className="text-primary fa fa-pencil-alt"
                                                                    title="firstNameDisabled"
                                                                ></span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </li>

                                                <li className="list-group-item border-left-0 border-right-0">
                                                    <div className="row">
                                                        <div className="col-sm-8 col-md-8">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                value={
                                                                    this.state
                                                                        .profile
                                                                        .last_name
                                                                }
                                                                onChange={
                                                                    this
                                                                        .setLastName
                                                                }
                                                                disabled={
                                                                    this.state
                                                                        .lastNameDisabled
                                                                }
                                                            />
                                                        </div>
                                                        <div className="col-sm-4 col-md-4">
                                                            <button
                                                                title="lastNameDisabled"
                                                                className="btn btn-default"
                                                                onClick={
                                                                    this
                                                                        .enableEdit
                                                                }
                                                            >
                                                                <span
                                                                    className="text-primary fa fa-pencil-alt"
                                                                    title="lastNameDisabled"
                                                                ></span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </li>

                                                <li className="list-group-item border-left-0 border-right-0">
                                                    <div className="row">
                                                        <div className="col-sm-8 col-md-8">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                defaultValue={
                                                                    this.state
                                                                        .profile
                                                                        .email
                                                                }
                                                                disabled
                                                            />
                                                        </div>
                                                    </div>
                                                </li>

                                                <li className="list-group-item border-left-0 border-right-0">
                                                    <div className="row">
                                                        <div className="col-sm-8 col-md-8">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                value={
                                                                    this.state
                                                                        .profile
                                                                        .phone_number
                                                                }
                                                                disabled={
                                                                    this.state
                                                                        .phoneNumberDisabled
                                                                }
                                                                onChange={
                                                                    this
                                                                        .setPhoneNumber
                                                                }
                                                            />
                                                        </div>
                                                        <div className="col-sm-4 col-md-4">
                                                            <button
                                                                title="phoneNumberDisabled"
                                                                className="btn btn-default"
                                                                onClick={
                                                                    this
                                                                        .enableEdit
                                                                }
                                                            >
                                                                <span
                                                                    className="text-primary fa fa-pencil-alt"
                                                                    title="phoneNumberDisabled"
                                                                ></span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </li>
                                            </div>
                                        </ul>

                                        <button
                                            className="btn btn-primary font-weight-bold"
                                            disabled={
                                                !this.state.isProfileUpdated
                                            }
                                            onClick={this.updateProfile}
                                        >
                                            <span className="fa fa-save"></span>{" "}
                                            Save
                                        </button>
                                    </div>
                                </form>
                            ) : (
                                <p className="font-weight-bold text-center text-muted">
                                    <span className="fab fa-searchengin fa-2x"></span>{" "}
                                    Oops. An error was encountered. Try again
                                </p>
                            )
                        ) : (
                            <div className="font-weight-bold text-center">
                                <span className="fa fa-spinner fa-pulse fa-3x"></span>
                                <p className="">Loading</p>
                            </div>
                        )}
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Profile;
