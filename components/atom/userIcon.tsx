import { FC } from "react";
import { makeStyles, createStyles } from "@material-ui/core";

const useStyles = makeStyles(() => createStyles({
    image: {
        width: "100px",
        height: "100px",
        borderRadius: "50%",
    },
    container: {
        display: "block",
    }
}));

type imageType = {
    image: string,
    alt:string,
    width?: number,
    height?:number,
}

const UserIcon:FC<imageType> = ({
    image, alt, width, height,
}) => {
    const classes = useStyles();
    return (
        <div className={ classes.container }>
            <img 
                src={ image || "/images/default-user-image.png" } 
                alt={ alt}
                className={ classes.image }
                style={{ width: width, height: height}}
            />
        </div>
    );
}

export default UserIcon;