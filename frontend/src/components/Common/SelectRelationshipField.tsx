import { createListCollection, Select } from "@chakra-ui/react"
import { useQuery } from "@tanstack/react-query"
import { useFormContext } from "react-hook-form"


interface SelectRelationshipFieldProps {
  instanceName: string
  queryFn: any,
  queryKey: string,
  defaultValue?: string
}

const SelectRelationshipField = ({
    instanceName,
    queryFn,
    queryKey,
    defaultValue
}: SelectRelationshipFieldProps) => {
    const { data } = useQuery({
    queryFn: () =>
      queryFn(),
    queryKey: [queryKey],
    placeholderData: (prevData) => prevData,
  })
  const items = data?.data

  const {
    register
  } = useFormContext()
  
  const instanceCollection = items
    ? createListCollection<any>({
      items: items.map((item: any) => ({
        label: item.title ? item.title : `${item.title_en} | ${item.title_uk}`,
        value: item.id,
      })),
    })
    : null

  if (!instanceCollection) return

  return (
    <Select.Root
      collection={instanceCollection}
      id={`${instanceName}_id`}
      {...register(`product.${instanceName}_id`, {
        required: "Category is required.",
      })}
      size="sm"
      width="full"
      defaultValue={defaultValue ? [defaultValue] : undefined}
    >
        <Select.HiddenSelect />
        <Select.Control>
        <Select.Trigger>
            <Select.ValueText
              placeholder={`Select ${instanceName}`}
            />
        </Select.Trigger>
        <Select.IndicatorGroup>
            <Select.Indicator />
        </Select.IndicatorGroup>
        </Select.Control>
        <Select.Positioner>
        <Select.Content>
            {instanceCollection.items.map((instance) => (
            <Select.Item
              item={instance}
              key={instance.value}
              >
                {instance.label}
              <Select.ItemIndicator />
            </Select.Item>
            ))}
        </Select.Content>
        </Select.Positioner>
    </Select.Root>
  )
}

export default SelectRelationshipField


