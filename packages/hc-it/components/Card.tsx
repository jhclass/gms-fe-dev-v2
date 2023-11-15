import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Button,
  Link,
} from '@nextui-org/react'

export default function CardBnr() {
  return (
    <div className="grid grid-cols-5 gap-2 max-w-guid">
      <Card shadow="none">
        <Link href="/detail/1">
          <CardHeader className="absolute z-10 top-1 flex-col !items-start">
            <p className="font-bold uppercase text-tiny text-white/60">
              What to watch
            </p>
            <h4 className="font-medium text-white text-large">
              Stream the Acme event
            </h4>
          </CardHeader>
          <Image
            removeWrapper
            alt="Card background"
            className="z-0 object-cover w-full h-full"
            src="https://placehold.it/200x300"
          />
        </Link>
      </Card>
      <Card shadow="none">
        <Link href="/detail">
          <CardHeader className="absolute z-10 top-1 flex-col !items-start">
            <p className="font-bold uppercase text-tiny text-white/60">
              Plant a tree
            </p>
            <h4 className="font-medium text-white text-large">
              Contribute to the planet
            </h4>
          </CardHeader>
          <Image
            removeWrapper
            alt="Card background"
            className="z-0 object-cover w-full h-full"
            src="https://placehold.it/200x300"
          />
        </Link>
      </Card>
      <Card shadow="none">
        <Link href="/detail">
          <CardHeader className="absolute z-10 top-1 flex-col !items-start">
            <p className="font-bold uppercase text-tiny text-white/60">
              Supercharged
            </p>
            <h4 className="font-medium text-white text-large">
              Creates beauty like a beast
            </h4>
          </CardHeader>
          <Image
            removeWrapper
            alt="Card background"
            className="z-0 object-cover w-full h-full"
            src="https://placehold.it/200x300"
          />
        </Link>
      </Card>
      <Card shadow="none">
        <Link href="/detail">
          <CardHeader className="absolute z-10 top-1 flex-col !items-start">
            <p className="font-bold uppercase text-tiny text-white/60">
              Supercharged
            </p>
            <h4 className="font-medium text-white text-large">
              Creates beauty like a beast
            </h4>
          </CardHeader>
          <Image
            removeWrapper
            alt="Card background"
            className="z-0 object-cover w-full h-full"
            src="https://placehold.it/200x300"
          />
        </Link>
      </Card>
      <Card shadow="none">
        <Link href="/detail">
          <CardHeader className="absolute z-10 top-1 flex-col !items-start">
            <p className="font-bold uppercase text-tiny text-white/60">
              Supercharged
            </p>
            <h4 className="font-medium text-white text-large">
              Creates beauty like a beast
            </h4>
          </CardHeader>
          <Image
            removeWrapper
            alt="Card background"
            className="z-0 object-cover w-full h-full"
            src="https://placehold.it/200x300"
          />
        </Link>
      </Card>
    </div>
  )
}
