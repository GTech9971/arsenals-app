import { Card, Image } from "@chakra-ui/react"
import { Gun } from "@gtech9971/arsenals.model";

export const GunCard = (props: Gun) => {
    return (
        <Card.Root width="320px">
            <Image src={props.imageUrl} />

            <Card.Body gap="2">
                <Card.Title mt='2'>{props.name}</Card.Title>
                <Card.Description>
                    {props.category?.name}
                </Card.Description>

            </Card.Body>

            <Card.Footer justifyContent="flex-end">
                <p>装弾数:{props.capacity}</p>
            </Card.Footer>
        </Card.Root>
    )
}