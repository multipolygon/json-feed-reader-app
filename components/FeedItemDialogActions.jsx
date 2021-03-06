/* global URL process */
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import OpenIcon from 'mdi-material-ui/OpenInNew';
import CloseIcon from 'mdi-material-ui/Close';
import FavouriteIcon from 'mdi-material-ui/Star';
import ArchiveIcon from 'mdi-material-ui/Archive';
import QueueIcon from 'mdi-material-ui/InboxArrowDown';
import LeftIcon from 'mdi-material-ui/ChevronLeft';
import RightIcon from 'mdi-material-ui/ChevronRight';
import LinkIcon from 'mdi-material-ui/LinkVariant';
import { useContext } from 'react';
import httpStatusCodes from 'builtin-status-codes';
import ButtonGrid from './ButtonGrid';
import { FeedbackContext } from './Feedback';
import { UserContext } from './User';

export default function FeedItemDialogActions({
    feedUrl,
    feedItems,
    itemId,
    itemIndex,
    item,
    goTo,
    close,
}) {
    const { user } = useContext(UserContext);
    const [, setFeedback] = useContext(FeedbackContext);
    const size = window.innerWidth > 640 ? 'medium' : 'small';

    const action = (i, addOrRem, bucket, favourite) => {
        if (i) {
            window
                .fetch(new URL('/feed-item-action', process.env.API_HOST).href, {
                    method: 'POST',
                    mode: 'cors',
                    cache: 'no-cache',
                    headers: {
                        'Content-Type': 'application/json',
                        ...(user && user.token
                            ? {
                                  Authorization: `Bearer ${user.token}`,
                              }
                            : {}),
                    },
                    body: JSON.stringify({
                        feedPath: ((i && i._feed_url && i._feed_url.parent) || feedUrl).replace(
                            process.env.CONTENT_HOST_DEV || process.env.CONTENT_HOST,
                            '',
                        ),
                        id: (i && i._id && i._id.parent) || itemId,
                        action: addOrRem,
                        bucket,
                        favourite,
                    }),
                })
                .then((response) => {
                    if (response.ok) {
                        setFeedback({
                            ok: true,
                            msg: `Success (${bucket}-${addOrRem}).`,
                        });
                    } else {
                        setFeedback({ ok: false, msg: httpStatusCodes[response.status] });
                    }
                })
                .catch(() => {
                    setFeedback({ ok: false, msg: 'Error!' });
                });
        }
    };

    return (
        <ButtonGrid
            justify="flex-start"
            items={[
                <Button onClick={close} size={size} variant="outlined">
                    <CloseIcon />
                </Button>,
                <ButtonGroup>
                    <Button
                        disabled={itemIndex === -1}
                        onClick={() => goTo(feedItems[itemIndex - 1])}
                        size={size}
                    >
                        <LeftIcon />
                    </Button>
                    <Button
                        disabled={itemIndex === -1 || itemIndex === feedItems.length - 1}
                        onClick={() => goTo(feedItems[itemIndex + 1])}
                        size={size}
                    >
                        <RightIcon />
                    </Button>
                </ButtonGroup>,
                !process.env.LIMITED && (
                    <ButtonGroup>
                        <Button
                            onClick={() => action(item, 'add', 'queue')}
                            startIcon={<QueueIcon />}
                            size={size}
                        >
                            Queue
                        </Button>
                        <Button
                            onClick={() => action(item, 'rem', 'queue')}
                            style={{ padding: 0 }}
                            size={size}
                        >
                            <CloseIcon fontSize="small" />
                        </Button>
                    </ButtonGroup>
                ),
                !process.env.LIMITED && (
                    <ButtonGroup>
                        <Button
                            onClick={() => action(item, 'add', 'archive')}
                            startIcon={<ArchiveIcon />}
                            size={size}
                        >
                            Archive
                        </Button>
                        <Button
                            onClick={() => action(item, 'rem', 'archive')}
                            style={{ padding: 0 }}
                            size={size}
                        >
                            <CloseIcon fontSize="small" />
                        </Button>
                    </ButtonGroup>
                ),
                !process.env.LIMITED && (
                    <ButtonGroup>
                        <Button
                            onClick={() => action(item, 'add', 'archive', true)}
                            startIcon={<FavouriteIcon />}
                            size={size}
                        >
                            Favourite
                        </Button>
                        <Button
                            onClick={() => action(item, 'add', 'archive', false)}
                            style={{ padding: 0 }}
                            size={size}
                        >
                            <CloseIcon fontSize="small" />
                        </Button>
                    </ButtonGroup>
                ),
                item.url && (
                    <Button
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="outlined"
                        size={size}
                    >
                        <OpenIcon />
                    </Button>
                ),
                item.external_url && (
                    <Button
                        href={item.external_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="outlined"
                        size={size}
                    >
                        <LinkIcon />
                    </Button>
                ),
            ]}
        />
    );
}
