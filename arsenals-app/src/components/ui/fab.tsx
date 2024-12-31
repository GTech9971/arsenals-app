import { IconButton } from "@chakra-ui/react"
import { IoMdAdd } from "react-icons/io"

export type FabProps = {
    onClick?: () => void
}

export const Fab: React.FC<FabProps> = ({ onClick }) => {
    return (
        <IconButton
            position='absolute'
            bottom='16'
            right='8'
            zIndex={999}
            onClick={onClick} >
            <IoMdAdd />
        </IconButton>
    )
}