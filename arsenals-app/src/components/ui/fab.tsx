import { IconButton } from "@chakra-ui/react"
import { IoMdAdd } from "react-icons/io"

export type FabProps = {
    onClick?: () => void
}

export const Fab: React.FC<FabProps> = ({ onClick }) => {
    return (
        <IconButton
            position='fixed'
            bottom='4'
            right='4'
            onClick={onClick} >
            <IoMdAdd />
        </IconButton>
    )
}